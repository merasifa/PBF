import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { signIn, signInWithGoogle, signInWithGithub } from "@/utils/db/servicefirebase"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: any = await signIn(credentials.email)

        if (user) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          )

          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
              type: "credentials",
            }
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email
        token.fullname = user.fullname
        token.role = user.role
        token.type = account.provider
      }

      if ((account?.provider === "google" || account?.provider === "github") && user) {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        }

        await new Promise<void>((resolve) => {
          const callback = (result: {
            status: boolean;
            message: string;
            data?: {
              id?: string;
              email: string;
              fullname?: string;
              image?: string;
              role?: string;
              type?: string;
            };
          }) => {
            if (result.status && result.data) {
              token.role = result.data.role
            }
            resolve()
          }

          if (account.provider === "google") {
            signInWithGoogle(data, callback)
          } else {
            signInWithGithub(data, callback)
          }
        })

        token.fullname = data.fullname
        token.email = data.email
        token.image = data.image
        token.type = data.type
      }

      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token.email) {
        session.user.email = token.email
      }
      if (token.fullname) {
        session.user.fullname = token.fullname
      }
      if (token.image) {
        session.user.image = token.image
      }
      if (token.role) {
        session.user.role = token.role
      }
      if (token.type) {
        session.user.type = token.type
      }

      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}

export default NextAuth(authOptions)

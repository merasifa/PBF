import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "@/utils/db/servicefirebase"
import bcrypt from "bcrypt"

export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
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
            }
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email
        token.fullname = user.fullname
        token.role = user.role
      }
      //  console.log("jwt callback", { token, account, user })
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
      if (token.role) {
        session.user.role = token.role
      }
      //  console.log("session callback", { session, token })
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}

export default NextAuth(authOptions)

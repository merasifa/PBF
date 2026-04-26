import { DefaultSession } from "next-auth"
import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      fullname?: string
      role?: string
      image?: string | null
      type?: string
    } & DefaultSession["user"]
  }

  interface User {
    fullname?: string
    role?: string
    image?: string | null
    type?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string
    role?: string
    image?: string | null
    type?: string
  }
}

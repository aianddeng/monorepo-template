import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = {
            // id: 1,
            name: 'Jack Ma',
            email: 'test@example.com',
          }
          if (
            credentials.email === 'test@example.com' &&
            credentials.password === '88888888'
          ) {
            return user
          } else {
            return null
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
      }
      return token
    },
    session({ session, token }) {
      if (token) {
      }
      return session
    },
  },
})

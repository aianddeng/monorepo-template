'use client'

import { dataProvider } from '@/providers/data-provider'
import { Refine, type AuthProvider } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerProvider from '@refinedev/nextjs-router'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import 'shadcn/style.css'

type RefineContextProps = {}

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>,
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  )
}

type AppProps = {}

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession()
  const to = usePathname()

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="">loading...</span>
      </div>
    )
  }

  const authProvider: AuthProvider = {
    login: async () => {
      signIn('google', {
        callbackUrl: to ? to.toString() : '/',
        redirect: true,
      })

      return {
        success: true,
      }
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      })

      return {
        success: true,
      }
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        }
      }

      return {
        error,
      }
    },
    check: async () => {
      if (status === 'unauthenticated') {
        return {
          authenticated: false,
          redirectTo: '/login',
        }
      }

      return {
        authenticated: true,
      }
    },
    getPermissions: async () => {
      return null
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data
        return {
          name: user.name,
          avatar: user.image,
        }
      }

      return null
    },
  }

  return (
    <>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
          }}
        >
          {props.children}
          <RefineKbar />
        </Refine>
      </RefineKbarProvider>
    </>
  )
}

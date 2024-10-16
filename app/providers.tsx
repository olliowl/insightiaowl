'use client'

import { Auth0Provider } from '@auth0/auth0-react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="insightia.us.auth0.com"
      clientId="GQAAj8DbV2alO1MvqvsrL67fsp6P9Ub3"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
        audience: "https://insightia.us.auth0.com/api/v2/"
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}
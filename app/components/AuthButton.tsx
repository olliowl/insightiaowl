'use client'

import { useAuth0 } from '@auth0/auth0-react'

export function AuthButton() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0()

  if (isLoading) {
    return <button className="px-4 py-2 rounded-full bg-gray-500">Loading...</button>
  }

  if (isAuthenticated) {
    return (
      <button
        className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors"
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      >
        Log Out
      </button>
    )
  } else {
    return (
      <button
        className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    )
  }
}
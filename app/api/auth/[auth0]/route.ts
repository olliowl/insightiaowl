import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: 'login',
    },
    returnTo: '/'  // Changed from '/dashboard' to '/'
  }),
  logout: handleLogout({
    returnTo: process.env.NEXT_PUBLIC_AUTH0_BASE_URL
  })
});
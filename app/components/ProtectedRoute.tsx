'use client'

import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return <>{children}</>;
}
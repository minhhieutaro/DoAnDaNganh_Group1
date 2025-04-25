'use client';

import React from 'react';
import { AuthProvider } from '../components/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
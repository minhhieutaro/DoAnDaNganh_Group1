import React from 'react';
import '../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Home Dashboard',
  description: 'Modern Smart Home Dashboard with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'use client'

import './globals.css'
import { useEffect } from 'react'

// 1. Import the toolbar
import { initToolbar } from '@stagewise/toolbar';

// 2. Define your toolbar configuration
const stagewiseConfig = {
  plugins: [],
};

// 3. Initialize the toolbar when your app starts
// Framework-agnostic approach - call this when your app initializes
function setupStagewise() {
  // Only initialize once and only in development mode
  if (process.env.NODE_ENV === 'development') {
    initToolbar(stagewiseConfig);
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    setupStagewise();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/nutri.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}

'use client'

import './globals.css'
import dynamic from 'next/dynamic'

// Dynamically import the ReactTogether wrapper with SSR disabled
const ReactTogetherWrapper = dynamic(() => import('../components/ReactTogetherWrapper'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  )
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Next.js + React Together</title>
        <meta name="description" content="Next.js starter template with React Together" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReactTogetherWrapper>
          {children}
        </ReactTogetherWrapper>
      </body>
    </html>
  )
}

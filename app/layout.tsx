'use client'

import './globals.css'
import { ReactTogether } from 'react-together'
import { useState } from 'react'
import { Users, Settings } from 'lucide-react'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [sessionParams, setSessionParams] = useState({
    appId: process.env.NEXT_PUBLIC_DEFAULT_APP_ID || 'io.multisynq.next-react-together',
    apiKey: process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY || 'YOUR_API_KEY_HERE',
    name: process.env.NEXT_PUBLIC_DEFAULT_SESSION_NAME || 'default-session',
    password: process.env.NEXT_PUBLIC_DEFAULT_SESSION_PASSWORD || 'demo123'
  })

  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(
    !process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY || process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY === 'YOUR_API_KEY_HERE'
  )

  const handleApiKeySubmit = (apiKey: string) => {
    setSessionParams(prev => ({ ...prev, apiKey }))
    setShowApiKeyPrompt(false)
  }

  if (showApiKeyPrompt) {
    return (
      <html lang="en">
        <head>
          <title>Next.js + React Together</title>
          <meta name="description" content="Next.js starter template with React Together" />
          <script src="https://cdn.tailwindcss.com/4.0.0-alpha.27/tailwindcss.js"></script>
        </head>
        <body>
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <ApiKeyPrompt onSubmit={handleApiKeySubmit} />
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>Next.js + React Together</title>
        <meta name="description" content="Next.js starter template with React Together" />
        <script src="https://cdn.tailwindcss.com/4.0.0-alpha.27/tailwindcss.js"></script>
      </head>
      <body>
        <ReactTogether
          sessionParams={sessionParams}
          rememberUsers={true}
        >
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-4">
                    <Users className="h-8 w-8 text-blue-600" />
                    <h1 className="text-xl font-semibold text-gray-900">
                      Next.js + React Together
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ConnectedUsersDisplay />
                    <SessionControls />
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </ReactTogether>
      </body>
    </html>
  )
}

function ApiKeyPrompt({ onSubmit }: { onSubmit: (apiKey: string) => void }) {
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      onSubmit(apiKey.trim())
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Welcome to React Together!</h2>
        <p className="text-gray-600 mt-2">
          Please enter your MultiSynq API key to get started.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your MultiSynq API key"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Connect
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an API key?{' '}
          <a
            href="https://multisynq.io/coder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500"
          >
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  )
}

function ConnectedUsersDisplay() {
  const { ConnectedUsers } = require('react-together')
  return <ConnectedUsers maxAvatars={5} className="flex items-center space-x-2" />
}

function SessionControls() {
  const { SessionManager } = require('react-together')
  return (
    <SessionManager className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
      <Settings className="h-4 w-4" />
      Session
    </SessionManager>
  )
}

'use client'

import './globals.css'
import { ReactTogether, useConnectedUsers, useIsTogether, useJoinUrl, useLeaveSession, useNicknames } from 'react-together'
import { useState, useEffect } from 'react'
import { Users, Settings, Sparkles, LogOut } from 'lucide-react'
import { ConnectedUser } from 'react-together/dist/hooks/useConnectedUsers'

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

  const [username, setUsername] = useState('')
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(true)

  const handleUsernameSubmit = (name: string) => {
    setUsername(name)
    setShowUsernamePrompt(false)
  }

  if (showUsernamePrompt) {
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
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="gradient-glow absolute inset-0"></div>
            <UsernamePrompt onSubmit={handleUsernameSubmit} />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ReactTogether
          sessionParams={sessionParams}
          rememberUsers={true}
        >
          <div className="min-h-screen bg-background">
            {/* Background effects */}
            <div className="gradient-glow absolute inset-0 pointer-events-none"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            {/* Navigation */}
            <nav className="relative z-10 glass border-b border-border">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-gradient">
                          React Together
                        </h1>
                        <p className="text-xs text-text-subtle">Real-time Collaboration</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <ConnectedUsersDisplay />
                    <SessionControls username={username} />
                  </div>
                </div>
              </div>
            </nav>

            {/* Main content */}
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </ReactTogether>
      </body>
    </html>
  )
}

function UsernamePrompt({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="glass-surface rounded-2xl p-8 max-w-md w-full relative scale-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center float">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Welcome</h2>
        <p className="text-text-muted">
          Enter your username to start collaborating
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-text mb-3">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full focus-ring"
            placeholder="Enter your username"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full hover-glow"
        >
          Connect & Collaborate
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-subtle">
          Choose any name you like - this will be visible to other users in the session
        </p>
      </div>
    </div>
  )
}

function ConnectedUsersDisplay() {
  const connectedUsers = useConnectedUsers() as ConnectedUser[]
  const isTogether = useIsTogether()

  if (!isTogether || !connectedUsers || connectedUsers.length === 0) return null
  console.log({ connectedUsers })
  return (
    <div className="flex items-center space-x-3">
      <div className="flex -space-x-2">
        {connectedUsers.slice(0, 3).map((user) => (
          <div
            key={user.userId}
            className="w-8 h-8 rounded-full bg-gradient-primary ring-2 ring-background flex items-center justify-center text-xs font-semibold text-white"
            title={user.nickname || user.userId}
          >
            {(user.nickname || user.userId || 'U').charAt(0).toUpperCase()}
          </div>
        ))}
        {connectedUsers.length > 3 && (
          <div className="w-8 h-8 rounded-full bg-surface ring-2 ring-background flex items-center justify-center text-xs text-text-muted">
            +{connectedUsers.length - 3}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
        <span className="text-sm text-text-muted">
          {connectedUsers.length} online
        </span>
      </div>
    </div>
  )
}

function SessionControls({ username }: { username: string }) {
  const joinUrl = useJoinUrl() as string | null
  const leaveSession = useLeaveSession()
  const isTogether = useIsTogether()
  const [showDropdown, setShowDropdown] = useState(false)

  const [myNickname, setMyNickname] = useNicknames()

  useEffect(() => {
    if (username && isTogether && myNickname !== username) {
      setMyNickname(username)
    }
  }, [username, isTogether, myNickname, setMyNickname])

  if (!isTogether) return null

  const copyJoinUrl = async () => {
    if (joinUrl && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(joinUrl)
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy URL:', err)
      }
    }
  }

  const handleLeaveSession = () => {
    if (leaveSession) {
      leaveSession()
    }
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="btn-secondary flex items-center space-x-2"
      >
        <Settings className="w-4 h-4" />
        <span>Session</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 glass-surface rounded-xl p-4 border border-border scale-in">
          <div className="space-y-3">
            <button
              onClick={copyJoinUrl}
              className="w-full text-left p-2 rounded-lg hover:bg-surface-hover transition-colors text-sm"
              disabled={!joinUrl}
            >
              📋 Copy invite link
            </button>
            <button
              onClick={handleLeaveSession}
              className="w-full text-left p-2 rounded-lg hover:bg-surface-hover transition-colors text-sm text-red-400 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Leave session</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

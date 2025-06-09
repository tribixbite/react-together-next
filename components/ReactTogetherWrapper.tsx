'use client'

import { ReactTogether, useConnectedUsers, useIsTogether } from 'react-together'
import { Sparkles } from 'lucide-react'
import SessionSettings from './SessionSettings'

interface ReactTogetherWrapperProps {
  children: React.ReactNode
}

export default function ReactTogetherWrapper({ children }: ReactTogetherWrapperProps) {
  const sessionParams = {
    appId: process.env.NEXT_PUBLIC_DEFAULT_APP_ID || 'io.multisynq.next-react-together',
    apiKey: process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY || 'YOUR_API_KEY_HERE',
    name: process.env.NEXT_PUBLIC_DEFAULT_SESSION_NAME || 'default-session',
    password: process.env.NEXT_PUBLIC_DEFAULT_SESSION_PASSWORD || 'demo123'
  }

  return (
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
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient">React Together</h1>
                  <p className="text-xs text-text-subtle">Real-time Collaboration</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <ConnectedUsersDisplay />
                <SessionSettings />
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
  )
}

function ConnectedUsersDisplay() {
  const connectedUsers = useConnectedUsers()
  const isTogether = useIsTogether()

  if (!isTogether || !connectedUsers || connectedUsers.length === 0) return null

  return (
    <div className="flex items-center space-x-3">
      <div className="flex -space-x-2">
        {connectedUsers.slice(0, 3).map((user) => {
          const displayName = user.nickname || user.userId || 'U'
          return (
            <div
              key={user.userId}
              className="w-8 h-8 rounded-full bg-gradient-primary ring-2 ring-background flex items-center justify-center text-xs font-semibold text-white"
              title={user.nickname || user.userId}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )
        })}
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
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  useStateTogether, 
  useChat, 
  useCursors, 
  useConnectedUsers, 
  useMyId, 
  useIsTogether, 
  useJoinUrl 
} from 'react-together'
import { 
  Zap, 
  Users, 
  MousePointer, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  Github,
  ExternalLink,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold">
                <span className="text-gradient">Real-time</span>
                <br />
                <span className="text-white">Collaboration</span>
              </h1>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Build synchronized multi-user experiences with React Together. 
                Watch live collaboration unfold in real-time.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://react-together.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2 hover-glow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <Link
                href="/showcase"
                className="btn-secondary inline-flex items-center space-x-2 hover-lift"
              >
                <Zap className="w-4 h-4" />
                <span>Full Showcase</span>
              </Link>
              
              <a
                href="https://github.com/multisynq/react-together"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">
              See It In Action
            </h2>
            <p className="text-text-muted text-lg">
              Try these live demos with multiple browser tabs or share your session URL
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Live Counter Demo */}
            <LiveCounterDemo />
            
            {/* Live Chat Demo */}
            <LiveChatDemo />
            
            {/* Live Presence Demo */}
            <LivePresenceDemo />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for Modern Apps
            </h2>
            <p className="text-text-muted text-lg">
              Everything you need for real-time collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Sync"
              description="Changes appear instantly across all connected users with automatic conflict resolution."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="User Presence"
              description="Track who's online, see live cursors, and manage user interactions seamlessly."
            />
            <FeatureCard
              icon={<MousePointer className="w-6 h-6" />}
              title="Live Cursors"
              description="Real-time cursor tracking with smooth animations and user identification."
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Built-in Chat"
              description="Ready-to-use chat components with message history and user management."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Easy Setup"
              description="Simple hooks and components that work out of the box with minimal configuration."
            />
            <FeatureCard
              icon={<ArrowRight className="w-6 h-6" />}
              title="Production Ready"
              description="Battle-tested patterns with TypeScript support and comprehensive documentation."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-surface rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold text-gradient">
              Start Building Together
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Open multiple browser tabs to see real-time collaboration in action, 
              or share your session URL with others to collaborate live.
            </p>
            <div className="flex justify-center">
              <ConnectionStatus />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function LiveCounterDemo() {
  const isTogether = useIsTogether()
  const [count, setCount] = useStateTogether('demo-counter', 0)

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Live Counter</h3>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="text-center space-y-6">
        <div className="text-5xl font-bold text-gradient">
          {count}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCount(count - 1)}
            disabled={!isTogether}
            className="btn-secondary w-12 h-12 rounded-full flex items-center justify-center"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            disabled={!isTogether}
            className="btn-secondary px-4 py-2 rounded-lg"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCount(count + 1)}
            disabled={!isTogether}
            className="btn-primary w-12 h-12 rounded-full flex items-center justify-center glow-primary"
          >
            +
          </button>
        </div>
        
        <p className="text-sm text-text-subtle">
          Try clicking from multiple tabs!
        </p>
      </div>
    </div>
  )
}

function LiveChatDemo() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const { messages, sendMessage } = useChat('demo-chat')
  const [message, setMessage] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && isTogether) {
      sendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Live Chat</h3>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-32 bg-surface rounded-lg p-3 overflow-y-auto space-y-2">
          {messages.slice(-3).map((msg) => (
            <div
              key={msg.id}
              className={`text-sm p-2 rounded-lg ${
                msg.senderId === myId 
                  ? 'bg-primary text-white ml-4' 
                  : 'bg-surface-hover text-text mr-4'
              }`}
            >
              <div className="font-medium text-xs opacity-75 mb-1">
                {msg.senderId === myId ? 'You' : msg.senderId.slice(0, 8)}
              </div>
              {msg.message}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-text-subtle text-center text-sm">
              No messages yet
            </div>
          )}
        </div>
        
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!isTogether}
            className="input flex-1 text-sm"
          />
          <button
            type="submit"
            disabled={!isTogether || !message.trim()}
            className="btn-primary px-4 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

function LivePresenceDemo() {
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">User Presence</h3>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="text-white font-medium">
            {connectedUsers?.length || 0} user{(connectedUsers?.length || 0) !== 1 ? 's' : ''} online
          </span>
        </div>
        
        <div className="space-y-2">
          {connectedUsers?.slice(0, 3).map((user) => (
            <div key={user.userId} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-white">
                {(user.nickname || user.userId || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">
                  {user.nickname || user.userId}
                  {user.isYou && (
                    <span className="text-primary ml-2">(You)</span>
                  )}
                </div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          )) || []}
          
          {(!connectedUsers || connectedUsers.length === 0) && (
            <div className="text-text-subtle text-sm text-center py-4">
              No users connected
            </div>
          )}
        </div>
        
        <p className="text-sm text-text-subtle">
          Open multiple tabs to see more users
        </p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card text-center space-y-4">
      <div className="w-12 h-12 mx-auto rounded-xl gradient-primary flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-text-muted">{description}</p>
    </div>
  )
}

function ConnectionStatus() {
  const isTogether = useIsTogether()
  const joinUrl = useJoinUrl()
  const connectedUsers = useConnectedUsers()
  const [copied, setCopied] = useState(false)

  const copyJoinUrl = async () => {
    if (joinUrl) {
      await navigator.clipboard.writeText(joinUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const userCount = connectedUsers?.length || 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${isTogether ? 'bg-green-400 pulse-glow' : 'bg-red-400'}`}></div>
        <span className="text-white font-medium">
          {isTogether ? 'Connected' : 'Not Connected'}
        </span>
        {isTogether && (
          <span className="text-text-muted">
            ({userCount} user{userCount !== 1 ? 's' : ''})
          </span>
        )}
      </div>
      
      {isTogether && joinUrl && (
        <button
          onClick={copyJoinUrl}
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <span>{copied ? 'Copied!' : 'Copy invite link'}</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

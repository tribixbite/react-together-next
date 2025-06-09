'use client'

import { useState, useEffect, useRef } from 'react'
import { Palette, Users, Zap, Eye, Activity, MessageSquare } from 'lucide-react'
import { 
  useStateTogether, 
  useIsTogether, 
  useConnectedUsers, 
  useMyId, 
  useCursors
} from 'react-together'

interface User {
  userId: string
  nickname?: string
}

export default function CollaborativeShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with live activity */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 gradient-glow"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 fade-in">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-gradient">Collaboration</span>
              <br />
              <span className="text-white">In Motion</span>
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
              Watch real-time collaboration unfold before your eyes. 
              Every interaction is synchronized instantly across all connected users.
            </p>
            <LiveActivityFeed />
          </div>

          {/* Interactive showcase grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CollaborativeCanvas />
            <LiveReactionBoard />
            <RealTimeMetrics />
            <SharedColorPalette />
            <CollaborativeVoting />
            <LiveTypingIndicator />
          </div>
        </div>
      </section>
    </div>
  )
}

function LiveActivityFeed() {
  const [activities, setActivities] = useStateTogether('activity-feed', [] as any[])
  const connectedUsers = useConnectedUsers() as User[]
  const myId = useMyId()

  const addActivity = (action: string) => {
    const activity = {
      id: Date.now(),
      userId: myId,
      action,
      timestamp: Date.now()
    }
    setActivities((prev: any[]) => [activity, ...prev.slice(0, 4)]) // Keep last 5
  }

  const getUserNickname = (userId: string) => {
    const user = connectedUsers.find(u => u.userId === userId)
    return user?.nickname || user?.userId || userId.slice(0, 8)
  }

  return (
    <div className="glass-surface rounded-2xl p-6 max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Live Activity</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
          <span className="text-sm text-text-muted">
            {connectedUsers.length} online
          </span>
        </div>
      </div>
      
      <div className="space-y-2 min-h-[120px]">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-text-subtle">
            <p>No recent activity</p>
            <p className="text-xs mt-1">Try the demos below to see live updates!</p>
          </div>
        ) : (
          activities.map((activity: any) => {
            const timeAgo = Date.now() - activity.timestamp
            const secondsAgo = Math.floor(timeAgo / 1000)
            let timeText = 'just now'
            if (secondsAgo > 60) {
              timeText = `${Math.floor(secondsAgo / 60)}m ago`
            } else if (secondsAgo > 5) {
              timeText = `${secondsAgo}s ago`
            }
            
            return (
              <div key={activity.id} className="flex items-center space-x-3 fade-in">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-white">
                  <span className="font-medium">{getUserNickname(activity.userId)}</span>
                  <span className="text-text-muted"> {activity.action}</span>
                </span>
                <span className="text-xs text-text-subtle ml-auto">{timeText}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function CollaborativeCanvas() {
  const isTogether = useIsTogether()
  const [pixels, setPixels] = useStateTogether('canvas-pixels', {} as Record<string, any>)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handlePixelClick = (x: number, y: number) => {
    if (!isTogether) return
    const pixelKey = `${x}-${y}`
    const colors = ['#8b5cf6', '#06b6d4', '#22c55e', '#eab308', '#ef4444', '#ec4899']
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    setPixels((prev: any) => ({
      ...prev,
      [pixelKey]: { color, timestamp: Date.now() }
    }))
  }

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Pixel Canvas</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div 
        ref={canvasRef}
        className="grid grid-cols-12 gap-1 p-4 bg-gradient-surface rounded-lg border border-border cursor-pointer"
      >
        {Array.from({ length: 144 }, (_, i) => {
          const x = i % 12
          const y = Math.floor(i / 12)
          const pixelKey = `${x}-${y}`
          const pixel = pixels[pixelKey]
          
          return (
            <div
              key={i}
              className="w-4 h-4 rounded-sm border border-border hover:border-primary transition-all cursor-pointer"
              style={{
                backgroundColor: pixel?.color || 'transparent'
              }}
              onClick={() => handlePixelClick(x, y)}
            />
          )
        })}
      </div>
      
      <p className="text-sm text-text-subtle mt-3 text-center">
        Click pixels to paint with others!
      </p>
    </div>
  )
}

function LiveReactionBoard() {
  const isTogether = useIsTogether()
  const [reactions, setReactions] = useStateTogether('reactions', {} as Record<string, number>)

  const emojis = ['👍', '❤️', '😄', '🎉', '🔥', '✨']

  const addReaction = (emoji: string) => {
    if (!isTogether) return
    setReactions((prev: any) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }))
  }

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Live Reactions</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => addReaction(emoji)}
            disabled={!isTogether}
            className="p-3 bg-gradient-surface rounded-lg border border-border hover:border-primary transition-all text-2xl hover:scale-105 disabled:opacity-50"
          >
            {emoji}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        {Object.entries(reactions).map(([emoji, count]) => (
          <div key={emoji} className="flex items-center justify-between">
            <span className="text-lg">{emoji}</span>
            <span className="text-primary font-semibold">{count as number}</span>
          </div>
        ))}
      </div>
      
      {Object.keys(reactions).length === 0 && (
        <p className="text-sm text-text-subtle text-center py-4">
          Click reactions to share with everyone!
        </p>
      )}
    </div>
  )
}

function RealTimeMetrics() {
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()
  const { allCursors } = useCursors()
  
  const [startTime] = useState(Date.now())
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(Date.now() - startTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Session Metrics</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Connected Users</span>
          <span className="text-2xl font-bold text-primary">
            {connectedUsers.length}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Active Cursors</span>
          <span className="text-2xl font-bold text-accent">
            {Object.keys(allCursors).length}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Session Time</span>
          <span className="text-2xl font-bold text-green-400">
            {formatTime(sessionTime)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-text-muted">Status</span>
          <span className={`text-sm font-medium ${
            isTogether ? 'text-green-400' : 'text-red-400'
          }`}>
            {isTogether ? 'CONNECTED' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </div>
  )
}

function SharedColorPalette() {
  const isTogether = useIsTogether()
  const [selectedColor, setSelectedColor] = useStateTogether('shared-color', '#8b5cf6')

  const colors = [
    '#8b5cf6', '#06b6d4', '#22c55e', '#eab308', 
    '#ef4444', '#ec4899', '#f97316', '#6366f1'
  ]

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div 
            className="w-5 h-5 rounded-full border-2 border-white"
            style={{ backgroundColor: selectedColor }}
          />
          <h3 className="text-lg font-semibold text-white">Color Palette</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-4">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            disabled={!isTogether}
            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 disabled:opacity-50 ${
              selectedColor === color 
                ? 'border-white shadow-lg' 
                : 'border-border hover:border-white'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-text-muted mb-2">Selected Color</p>
        <div 
          className="w-full h-8 rounded-lg border border-border"
          style={{ backgroundColor: selectedColor }}
        />
        <p className="text-xs text-text-subtle mt-2">{selectedColor}</p>
      </div>
    </div>
  )
}

function CollaborativeVoting() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const [votes, setVotes] = useStateTogether('votes', {} as Record<string, number>)
  const [userVotes, setUserVotes] = useStateTogether('user-votes', {} as Record<string, string>)

  const options = [
    { id: 'pizza', emoji: '🍕', label: 'Pizza' },
    { id: 'burger', emoji: '🍔', label: 'Burger' },
    { id: 'sushi', emoji: '🍣', label: 'Sushi' },
    { id: 'taco', emoji: '🌮', label: 'Taco' }
  ]

  const vote = (optionId: string) => {
    if (!isTogether || !myId) return
    
    // Remove previous vote
    const previousVote = userVotes[myId]
    if (previousVote) {
      setVotes((prev: any) => ({
        ...prev,
        [previousVote]: Math.max(0, (prev[previousVote] || 0) - 1)
      }))
    }
    
    // Add new vote
    setVotes((prev: any) => ({
      ...prev,
      [optionId]: (prev[optionId] || 0) + 1
    }))
    
    setUserVotes((prev: any) => ({
      ...prev,
      [myId]: optionId
    }))
  }

  const totalVotes = Object.values(votes).reduce((sum: number, count: any) => sum + count, 0)
  const myVote = myId ? userVotes[myId] : null

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Team Vote</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <p className="text-sm text-text-muted mb-4 text-center">
        What should we have for lunch?
      </p>
      
      <div className="space-y-3">
        {options.map(option => {
          const voteCount = votes[option.id] || 0
          const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
          const isSelected = myVote === option.id
          
          return (
            <button
              key={option.id}
              onClick={() => vote(option.id)}
              disabled={!isTogether}
              className={`w-full p-3 rounded-lg border transition-all hover:scale-105 disabled:opacity-50 ${
                isSelected 
                  ? 'border-primary bg-primary/20' 
                  : 'border-border hover:border-primary bg-gradient-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-white font-medium">{option.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-primary font-semibold">{voteCount}</span>
                  {percentage > 0 && (
                    <span className="text-xs text-text-muted">({percentage.toFixed(0)}%)</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-text-subtle">
          {totalVotes} total vote{totalVotes !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

function LiveTypingIndicator() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const connectedUsers = useConnectedUsers() as User[]
  const [message, setMessage] = useState('')
  const [typingUsers, setTypingUsers] = useStateTogether('typing-users', {} as Record<string, number>)
  const [messages, setMessages] = useStateTogether('demo-messages', [] as any[])

  useEffect(() => {
    if (!myId || !isTogether) return
    
    if (message.length > 0) {
      setTypingUsers((prev: any) => ({
        ...prev,
        [myId]: Date.now()
      }))
    } else {
      setTypingUsers((prev: any) => {
        const updated = { ...prev }
        delete updated[myId]
        return updated
      })
    }
  }, [message, myId, isTogether, setTypingUsers])

  const sendMessage = () => {
    if (!message.trim() || !myId || !isTogether) return
    
    const newMessage = {
      id: Date.now(),
      userId: myId,
      text: message.trim(),
      timestamp: Date.now()
    }
    
    setMessages((prev: any[]) => [newMessage, ...prev.slice(0, 2)]) // Keep last 3
    setMessage('')
  }

  const getUserNickname = (userId: string) => {
    const user = connectedUsers.find(u => u.userId === userId)
    return user?.nickname || user?.userId || userId.slice(0, 8)
  }

  const getTypingUsers = () => {
    const now = Date.now()
    return Object.entries(typingUsers)
      .filter(([userId, timestamp]: [string, any]) => 
        userId !== myId && now - timestamp < 3000
      )
      .map(([userId]) => getUserNickname(userId))
  }

  const currentlyTyping = getTypingUsers()

  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Live Typing</h3>
        </div>
        <div className="text-sm text-text-muted">
          {isTogether ? '🟢 Live' : '🔴 Offline'}
        </div>
      </div>
      
      <div className="space-y-3 mb-4 min-h-[80px]">
        {messages.slice(0, 2).map((msg: any) => (
          <div key={msg.id} className="p-2 bg-gradient-surface rounded border border-border">
            <div className="text-xs text-text-subtle mb-1">
              {getUserNickname(msg.userId)}
            </div>
            <div className="text-sm text-white">{msg.text}</div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2 mb-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          disabled={!isTogether}
          className="input flex-1 text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={!isTogether || !message.trim()}
          className="btn-primary px-4 py-2 text-sm"
        >
          Send
        </button>
      </div>
      
      <div className="h-6">
        {currentlyTyping.length > 0 && (
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span>
              {currentlyTyping.join(', ')} 
              {currentlyTyping.length === 1 ? 'is' : 'are'} typing...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
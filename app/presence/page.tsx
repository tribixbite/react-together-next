'use client'

import Link from 'next/link'
import { ArrowLeft, Users, Eye } from 'lucide-react'
import { useIsTogether, useConnectedUsers, useNicknames, useHoveringUsers, HoverHighlighter } from 'react-together'

interface ConnectedUser {
  userId: string
  nickname: string
  isYou?: boolean
}

export default function PresencePage() {

  
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers() as ConnectedUser[]
  const [myNickname, setMyNickname, allNicknames] = useNicknames()

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Presence Demo</h1>
          <p className="text-gray-600">
            Please connect to a session to see user presence features.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Presence</h1>
            <p className="text-gray-600 mt-1">
              See who's online and track user interactions in real-time
            </p>
          </div>
        </div>

        {/* Current Users */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedUsers.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
          {connectedUsers.length === 1 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>You're the only one here. Share your session to see more users!</p>
            </div>
          )}
        </div>

        {/* Nickname Management */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Identity</h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
              Your Nickname:
            </label>
            <input
              id="nickname"
              type="text"
              value={myNickname}
              onChange={(e) => setMyNickname(e.target.value)}
              className="flex-1 max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your nickname..."
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This name will be visible to all other users in the session.
          </p>
        </div>

        {/* Hover Interaction Demo */}
        <HoverInteractionDemo />

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <HoverableCard title="Card 1" rtKey="hover-card-1" color="bg-red-100" />
          <HoverableCard title="Card 2" rtKey="hover-card-2" color="bg-green-100" />
          <HoverableCard title="Card 3" rtKey="hover-card-3" color="bg-blue-100" />
          <HoverableCard title="Card 4" rtKey="hover-card-4" color="bg-yellow-100" />
          <HoverableCard title="Card 5" rtKey="hover-card-5" color="bg-purple-100" />
          <HoverableCard title="Card 6" rtKey="hover-card-6" color="bg-pink-100" />
        </div>

        {/* Code Example */}
        <CodeExample />
      </div>
    </div>
  )
}

function UserCard({ user }: { user: ConnectedUser }) {
  // Simple color generation based on userId for consistent coloring
  const getUserColor = (id: string): string => {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
      '#ec4899', '#f43f5e'
    ]
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const userColor = getUserColor(user.userId)
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: userColor }}
        >
          {(user.nickname || user.userId || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.nickname || user.userId}
            {user.isYou && <span className="text-blue-600 ml-1">(You)</span>}
          </p>
          <p className="text-xs text-gray-500 truncate">ID: {user.userId}</p>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-600">Online</span>
        </div>
      </div>
    </div>
  )
}

function HoverInteractionDemo() {
  const [hoverRef, hoveringUserIds, iAmHovering] = useHoveringUsers('demo-hover-area')
  const [, , allNicknames] = useNicknames()

  const hoveringNicknames = hoveringUserIds.map(id => allNicknames[id] || id)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Hover Interaction Demo</h2>
      <p className="text-gray-600 mb-4">
        The box below tracks who is hovering over it. Try hovering with multiple users!
      </p>
      
      <div
        ref={hoverRef}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${iAmHovering ? 'border-blue-500 bg-blue-50' : 
            hoveringUserIds.length > 0 ? 'border-green-500 bg-green-50' : 
            'border-gray-300 bg-gray-50'}
        `}
      >
        <Eye className="h-12 w-12 mx-auto mb-3 text-gray-500" />
        <p className="text-lg font-medium text-gray-900 mb-2">Hover Detection Area</p>
        
        {hoveringUserIds.length === 0 && !iAmHovering && (
          <p className="text-gray-600">No one is hovering</p>
        )}
        
        {iAmHovering && (
          <p className="text-blue-600 font-medium">You are hovering! 👆</p>
        )}
        
        {hoveringUserIds.length > 0 && (
          <div className="mt-3">
            <p className="text-green-600 font-medium mb-1">
              {hoveringUserIds.length} user{hoveringUserIds.length !== 1 ? 's' : ''} hovering:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {hoveringNicknames.map((nickname, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  {nickname}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function HoverableCard({ title, rtKey, color }: { title: string, rtKey: string, color: string }) {
  const [, hoveringUserIds] = useHoveringUsers(rtKey)
  const [, , allNicknames] = useNicknames()

  return (
    <HoverHighlighter rtKey={rtKey} className="h-32">
      <div className={`${color} rounded-lg p-4 h-full flex flex-col justify-between border-2 border-transparent hover:border-gray-300 transition-all`}>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="text-sm text-gray-600">
          {hoveringUserIds.length > 0 ? (
            <div>
              <p>👁️ {hoveringUserIds.length} watching</p>
              <div className="text-xs mt-1">
                {hoveringUserIds.slice(0, 2).map(id => allNicknames[id] || id).join(', ')}
                {hoveringUserIds.length > 2 && ` +${hoveringUserIds.length - 2} more`}
              </div>
            </div>
          ) : (
            <p>Hover to interact</p>
          )}
        </div>
      </div>
    </HoverHighlighter>
  )
}

function CodeExample() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Code Example</h3>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{`import { 
  useConnectedUsers, 
  useNicknames, 
  useHoveringUsers,
  HoverHighlighter 
} from 'react-together'

function PresenceDemo() {
  const connectedUsers = useConnectedUsers()
  const [nickname, setNickname] = useNicknames()
  const [hoverRef, hoveringUsers] = useHoveringUsers('my-area')
  
  return (
    <div>
      <p>Users online: {connectedUsers.length}</p>
      
      <HoverHighlighter rtKey="interactive-element">
        <div>Hover me!</div>
      </HoverHighlighter>
      
      <div ref={hoverRef}>
        Hovering: {hoveringUsers.length} users
      </div>
    </div>
  )
}`}</code>
      </pre>
    </div>
  )
}

'use client'

interface UserAvatarProps {
  userId: string
  nickname?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showOnlineStatus?: boolean
  className?: string
}

export function UserAvatar({ 
  userId, 
  nickname, 
  size = 'md', 
  showOnlineStatus = false,
  className = ''
}: UserAvatarProps) {
  const { utils } = require('react-together')
  
  const userColor = utils?.getUserColor ? utils.getUserColor(userId) : '#6b7280'
  const displayName = nickname || userId
  const initials = displayName.charAt(0).toUpperCase()

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-semibold`}
        style={{ backgroundColor: userColor }}
      >
        {initials}
      </div>
      {showOnlineStatus && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  )
}

interface UserCardProps {
  user: {
    userId: string
    nickname: string
    isYou?: boolean
  }
  showStatus?: boolean
  className?: string
}

export function UserCard({ user, showStatus = true, className = '' }: UserCardProps) {
  return (
    <div className={`flex items-center space-x-3 p-3 bg-white rounded-lg border ${className}`}>
      <UserAvatar 
        userId={user.userId} 
        nickname={user.nickname} 
        size="md" 
        showOnlineStatus={showStatus}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.nickname}
          {user.isYou && <span className="text-blue-600 ml-1">(You)</span>}
        </p>
        <p className="text-xs text-gray-500 truncate">
          ID: {user.userId}
        </p>
      </div>
      {showStatus && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-600">Online</span>
        </div>
      )}
    </div>
  )
}

interface UserListProps {
  className?: string
}

export function UserList({ className = '' }: UserListProps) {
  const { useConnectedUsers } = require('react-together')
  const connectedUsers = useConnectedUsers()

  if (connectedUsers.length === 0) {
    return (
      <div className={`text-center py-4 text-gray-500 ${className}`}>
        <p>No users connected</p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {connectedUsers.map((user) => (
        <UserCard key={user.userId} user={user} />
      ))}
    </div>
  )
}

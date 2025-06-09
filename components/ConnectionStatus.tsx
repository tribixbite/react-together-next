'use client'

import { useConnectedUsers, useJoinUrl, useMyId, useIsTogether } from "react-together"

interface ConnectionStatusProps {
  className?: string
}

export function ConnectionStatus({ className = '' }: ConnectionStatusProps) {
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()
  const joinUrl = useJoinUrl()
  const myId = useMyId()

  if (!isTogether) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-red-600">Not connected</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="text-sm text-green-600">
        Connected ({connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''})
      </span>
    </div>
  )
}

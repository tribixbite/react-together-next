'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Settings, User, LogOut } from 'lucide-react'
import { useJoinUrl, useLeaveSession, useNicknames, useIsTogether } from 'react-together'

export default function SessionSettings() {
  const joinUrl = useJoinUrl() as string | null
  const leaveSession = useLeaveSession()
  const isTogether = useIsTogether()
  const [showDropdown, setShowDropdown] = useState(false)
  const [myNickname, setMyNickname] = useNicknames()
  const [tempNickname, setTempNickname] = useState('')
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Initialize temp nickname when dropdown opens
  useEffect(() => {
    if (showDropdown && !tempNickname) {
      setTempNickname(myNickname || '')
    }
  }, [showDropdown, myNickname, tempNickname])

  // Update dropdown position when button position changes
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      })
    }
  }, [showDropdown])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      
      if (buttonRef.current && !buttonRef.current.contains(target)) {
        // Check if click is inside dropdown
        const dropdown = document.getElementById('session-dropdown')
        if (!dropdown || !dropdown.contains(target)) {
          setShowDropdown(false)
        }
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  if (!isTogether) return null

  const copyJoinUrl = async () => {
    if (joinUrl) {
      try {
        await navigator.clipboard.writeText(joinUrl)
        alert('Invite link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy URL:', err)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = joinUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Invite link copied to clipboard!')
      }
    }
  }

  const handleLeaveSession = () => {
    if (confirm('Are you sure you want to leave this session?')) {
      if (leaveSession) {
        leaveSession()
      }
      setShowDropdown(false)
    }
  }

  const handleNicknameUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (tempNickname.trim()) {
      setMyNickname(tempNickname.trim())
      setShowDropdown(false)
    }
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const dropdownContent = showDropdown ? (
    <div 
      id="session-dropdown"
      className="fixed w-80 glass-surface rounded-xl p-4 border border-border shadow-xl"
      style={{ 
        top: dropdownPosition.top,
        right: dropdownPosition.right,
        zIndex: 10000
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="space-y-4">
        {/* Username Section */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Your Username
          </label>
          <form onSubmit={handleNicknameUpdate} className="flex space-x-2">
            <input
              type="text"
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              placeholder="Enter your username"
              className="input flex-1 text-sm"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!tempNickname.trim()}
              className="btn-primary px-3 py-1 text-sm"
            >
              Set
            </button>
          </form>
          {myNickname && (
            <p className="text-xs text-text-subtle mt-1">
              Current: {myNickname}
            </p>
          )}
        </div>

        <div className="border-t border-border pt-3 space-y-2">
          <button
            onClick={copyJoinUrl}
            className="w-full text-left p-2 rounded-lg hover:bg-surface-hover transition-colors text-sm text-text"
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
    </div>
  ) : null

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="btn-secondary flex items-center space-x-2"
        title="Session Settings"
      >
        <Settings className="w-4 h-4" />
        <span>Settings</span>
      </button>

      {typeof window !== 'undefined' && dropdownContent && createPortal(dropdownContent, document.body)}
    </div>
  )
} 
'use client'

import { useState } from 'react'
import { Share2, Copy, Check, ExternalLink } from 'lucide-react'
import { useJoinUrl, useIsTogether } from 'react-together'

interface ShareButtonProps {
  className?: string
  variant?: 'button' | 'icon' | 'text'
}

export function ShareButton({ className = '', variant = 'button' }: ShareButtonProps) {
  const joinUrl = useJoinUrl() as string | null
  const isTogether = useIsTogether()
  const [copied, setCopied] = useState(false)

  if (!isTogether || !joinUrl) {
    return null
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my collaborative session',
          text: 'Join this real-time collaborative session!',
          url: joinUrl,
        })
      } catch (err) {
        console.error('Failed to share:', err)
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleShare}
        className={`p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
        title="Share session"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
      </button>
    )
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleShare}
        className={`text-sm text-blue-600 hover:text-blue-700 underline ${className}`}
      >
        {copied ? 'Copied!' : 'Share session'}
      </button>
    )
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span>Share Session</span>
        </>
      )}
    </button>
  )
}

export function ShareableURL({ className = '' }: { className?: string }) {
  const joinUrl = useJoinUrl() as string | null
  const isTogether = useIsTogether()
  const [copied, setCopied] = useState(false)

  if (!isTogether || !joinUrl) {
    return null
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className={`bg-gray-50 border rounded-lg p-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Share this URL to invite others:
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={joinUrl}
          readOnly
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
        />
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        <a
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

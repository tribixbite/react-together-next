'use client'

import Link from 'next/link'
import { ArrowLeft, FileText, Save, RotateCcw, BarChart3, Users } from 'lucide-react'
import { useRef } from 'react'
import {
  useStateTogether,
  useStateTogetherWithPerUserValues,
  useConnectedUsers,
  useMyId,
  useIsTogether
} from 'react-together'

export default function EditorPage() {


  const isTogether = useIsTogether()
  const myId = useMyId()
  const connectedUsers = useConnectedUsers()

  // Refs for throttling/debouncing
  const lastActivityTime = useRef(0)
  const lastCursorUpdate = useRef(0)

  // Shared document content
  const [documentContent, setDocumentContent] = useStateTogether('document-content',
    '# Welcome to Collaborative Editing!\n\nThis is a shared document that multiple users can edit simultaneously.\n\n## Features:\n- Real-time synchronization\n- Per-user cursors\n- Change history\n- Auto-save\n\nStart typing below to see the magic happen! ✨\n\n'
  )

  // Per-user cursor positions
  const [myCursorPosition, setMyCursorPosition, allCursorPositions] =
    useStateTogetherWithPerUserValues('cursor-positions', 0)

  // Document metadata
  const [lastSaved, setLastSaved] = useStateTogether('last-saved', Date.now())
  const [documentTitle, setDocumentTitle] = useStateTogether('document-title', 'Untitled Document')

  // Activity feed
  const [activityFeed, setActivityFeed] = useStateTogether('activity-feed', [] as any[])

  // Helper function to add activity directly
  const addActivity = (activity: any) => {
    console.log('Adding activity:', activity) // Debug log
    setActivityFeed((prev: any[]) => [activity, ...prev.slice(0, 9)]) // Keep last 10 activities
  }

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collaborative Editor</h1>
          <p className="text-gray-600">
            Please connect to a session to use the collaborative editor.
          </p>
        </div>
      </div>
    )
  }

  console.log('Current activity feed:', activityFeed) // Debug log

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    const cursorPos = e.target.selectionStart

    setDocumentContent(newContent)
    setMyCursorPosition(cursorPos)

    // Add activity for content changes - less aggressive debouncing
    const now = Date.now()
    if (now - lastActivityTime.current > 1000) { // Reduced from 2000ms to 1000ms
      const user = connectedUsers.find(u => u.userId === myId)
      addActivity({
        id: now,
        userId: myId,
        userName: user?.nickname || user?.userId || 'Unknown',
        action: 'edited',
        timestamp: now
      })
      lastActivityTime.current = now
    }
  }

  const handleCursorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Throttle cursor updates to avoid rate limiting
    const now = Date.now()
    if (now - lastCursorUpdate.current > 500) {
      setMyCursorPosition(e.target.selectionStart)
      lastCursorUpdate.current = now
    }
  }

  const handleCursorPosition = (e: any) => {
    // Throttle cursor updates to avoid rate limiting
    const now = Date.now()
    if (now - lastCursorUpdate.current > 500) {
      setMyCursorPosition(e.target.selectionStart)
      lastCursorUpdate.current = now
    }
  }

  const saveDocument = () => {
    setLastSaved(Date.now())
    const user = connectedUsers.find(u => u.userId === myId)
    // Immediate activity for save action
    addActivity({
      id: Date.now(),
      userId: myId,
      userName: user?.nickname || user?.userId || 'Unknown',
      action: 'saved',
      timestamp: Date.now()
    })
  }

  const resetDocument = () => {
    setDocumentContent('# New Document\n\nStart writing your collaborative document here...\n\n')
    setDocumentTitle('Untitled Document')
    const user = connectedUsers.find(u => u.userId === myId)
    // Immediate activity for reset action
    addActivity({
      id: Date.now(),
      userId: myId,
      userName: user?.nickname || user?.userId || 'Unknown',
      action: 'reset',
      timestamp: Date.now()
    })
    // Clear activity feed after adding reset activity
    setTimeout(() => {
      setActivityFeed([])
    }, 100)
  }

  const getUserNickname = (userId: string) => {
    const user = connectedUsers.find(u => u.userId === userId)
    return user?.nickname || user?.userId || userId
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Collaborative Text Editor</h1>
            <p className="text-gray-600 mt-1">
              Real-time collaborative editing with synchronized cursors and activity tracking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Document Header */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <input
                    type="text"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="text-xl font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    placeholder="Document title..."
                  />
                  <p className="text-sm text-gray-500 px-2">
                    Last saved: {formatTime(lastSaved)} • {documentContent.length} characters
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={saveDocument}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={resetDocument}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Text Editor */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="relative">
                <textarea
                  value={documentContent}
                  onChange={handleContentChange}
                  onSelect={handleCursorPosition}
                  onClick={handleCursorPosition}
                  onKeyUp={handleCursorPosition}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Start typing your collaborative document..."
                  style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}
                />

                {/* Cursor indicators */}
                <div className="absolute top-4 right-4 space-y-1">
                  {Object.entries(allCursorPositions).map(([userId, position]) => {
                    if (userId === myId) return null
                    const user = connectedUsers.find(u => u.userId === userId)
                    if (!user) return null

                    return (
                      <div
                        key={userId}
                        className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{user.nickname} @ {position}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Editor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{documentContent.split('\n').length}</div>
                <div className="text-sm text-gray-600">Lines</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{documentContent.split(' ').filter(w => w.length > 0).length}</div>
                <div className="text-sm text-gray-600">Words</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{documentContent.length}</div>
                <div className="text-sm text-gray-600">Characters</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Editors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Editors</h3>
              <div className="space-y-3">
                {connectedUsers.map((user) => {
                  const cursorPos = allCursorPositions[user.userId] || 0
                  return (
                    <div key={user.userId} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {(user.nickname || user.userId || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.nickname || user.userId}
                          {user.isYou && <span className="text-blue-600 ml-1">(You)</span>}
                        </p>
                        <p className="text-xs text-gray-500">Cursor at {cursorPos}</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {activityFeed.length === 0 ? (
                  <p className="text-sm text-gray-500">No recent activity</p>
                ) : (
                  activityFeed.map((activity: any) => (
                    <div key={activity.id} className="text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${activity.action === 'edited' ? 'bg-blue-500' :
                          activity.action === 'saved' ? 'bg-green-500' :
                            'bg-gray-500'
                          }`}></div>
                        <span className="font-medium text-gray-900">{activity.userName}</span>
                        <span className="text-gray-600">{activity.action} the document</span>
                      </div>
                      <div className="text-xs text-gray-500 ml-4 mt-1">
                        {formatTime(activity.timestamp)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Collaboration Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Collaboration Tips</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Changes sync in real-time</li>
                <li>• Cursor positions are shared</li>
                <li>• Use chat for coordination</li>
                <li>• Save frequently</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Collaborative Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Real-time Sync</h3>
              <p className="text-sm text-gray-600">All edits appear instantly for everyone</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Save className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Auto-save</h3>
              <p className="text-sm text-gray-600">Changes are automatically preserved</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Live Cursors</h3>
              <p className="text-sm text-gray-600">See where others are editing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Activity Feed</h3>
              <p className="text-sm text-gray-600">Track all document changes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

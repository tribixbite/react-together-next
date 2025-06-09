'use client'

import Link from 'next/link'
import { ArrowLeft, MousePointer } from 'lucide-react'
import { useIsTogether, useCursors, useConnectedUsers, Cursors } from 'react-together'

export default function CursorsPage() {
  const isTogether = useIsTogether()
  const { myCursor, allCursors } = useCursors({ omitMyValue: false })
  const connectedUsers = useConnectedUsers()

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <MousePointer className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Cursors Demo</h1>
          <p className="text-gray-600">
            Please connect to a session to see live cursors.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 min-h-screen">
      <Cursors omitMyValue={false} />
      
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
            <h1 className="text-3xl font-bold text-gray-900">Live Cursors</h1>
            <p className="text-gray-600 mt-1">
              See everyone's mouse movements in real-time
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-purple-900 mb-3">
            👆 Move your mouse around this page
          </h2>
          <p className="text-purple-800 mb-4">
            Your cursor is being tracked and shared with all other connected users. 
            Open this page in multiple tabs or share your session to see multiple cursors!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-purple-900">Current Users:</h3>
              <p className="text-purple-700">{connectedUsers.length} connected</p>
            </div>
            <div>
              <h3 className="font-medium text-purple-900">Active Cursors:</h3>
              <p className="text-purple-700">{Object.keys(allCursors).length} visible</p>
            </div>
          </div>
        </div>

        {/* Demo Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interactive Canvas */}
          <CursorPlayground />

          {/* Cursor Info */}
          <CursorInfo myCursor={myCursor} allCursors={allCursors} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            title="Real-time Tracking"
            description="Mouse positions update smoothly across all connected clients"
            color="bg-green-500"
          />
          <FeatureCard
            title="Smooth Animation"
            description="Cursors move with natural easing and transitions"
            color="bg-blue-500"
          />
          <FeatureCard
            title="User Identification"
            description="Each cursor shows the user's nickname and unique color"
            color="bg-purple-500"
          />
        </div>

        {/* Code Example */}
        <CodeExample />
      </div>
    </div>
  )
}

function CursorPlayground() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Area</h3>
      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-64 border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <MousePointer className="h-12 w-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Move your cursor here</p>
          <p className="text-sm text-gray-500">See how cursors interact in this space</p>
        </div>
        
        {/* Some interactive elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-red-400 rounded-full hover:bg-red-500 transition-colors cursor-pointer"></div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-green-400 rounded-full hover:bg-green-500 transition-colors cursor-pointer"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors cursor-pointer"></div>
      </div>
    </div>
  )
}

function CursorInfo({ myCursor, allCursors }: { myCursor: any, allCursors: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cursor Data</h3>
      
      {myCursor && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Your Cursor</h4>
          <div className="bg-gray-50 rounded p-3 text-sm font-mono">
            <div>X: {Math.round(myCursor.clientX)}px</div>
            <div>Y: {Math.round(myCursor.clientY)}px</div>
            <div>Page X: {Math.round(myCursor.pageX)}px</div>
            <div>Page Y: {Math.round(myCursor.pageY)}px</div>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          All Cursors ({Object.keys(allCursors).length})
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Object.entries(allCursors).map(([userId, cursor]: [string, any]) => (
            <div key={userId} className="bg-gray-50 rounded p-2">
              <div className="text-sm font-medium text-gray-900 truncate">{userId}</div>
              {cursor && (
                <div className="text-xs text-gray-600 font-mono">
                  {Math.round(cursor.clientX)}, {Math.round(cursor.clientY)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, color }: { title: string, description: string, color: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className={`${color} w-4 h-4 rounded-full mb-3`}></div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function CodeExample() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-white font-semibold mb-4">Code Example</h3>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{`import { Cursors, useCursors } from 'react-together'

function MyCursorsDemo() {
  const { myCursor, allCursors } = useCursors()
  
  return (
    <div>
      <Cursors options={{ omitMyValue: false }} />
      <p>Active cursors: {Object.keys(allCursors).length}</p>
    </div>
  )
}`}</code>
      </pre>
    </div>
  )
}

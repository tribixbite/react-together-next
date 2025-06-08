'use client'

import Link from 'next/link'
import { ArrowLeft, MessageSquare } from 'lucide-react'

export default function ChatPage() {
  const { Chat, useIsTogether } = require('react-together')
  const isTogether = useIsTogether()

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chat Demo</h1>
          <p className="text-gray-600">
            Please connect to a session to use the chat feature.
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
            <h1 className="text-3xl font-bold text-gray-900">Real-time Chat</h1>
            <p className="text-gray-600 mt-1">
              Send messages that sync instantly across all connected users
            </p>
          </div>
        </div>

        {/* Features Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <h3 className="font-medium text-gray-900">useChat Hook</h3>
                <p className="text-sm text-gray-600">Manages chat state and message synchronization</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <h3 className="font-medium text-gray-900">Chat Component</h3>
                <p className="text-sm text-gray-600">Ready-to-use chat UI with customizable styling</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <h3 className="font-medium text-gray-900">User Identification</h3>
                <p className="text-sm text-gray-600">Automatic user nicknames and message attribution</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
              <div>
                <h3 className="font-medium text-gray-900">Real-time Sync</h3>
                <p className="text-sm text-gray-600">Messages appear instantly for all connected users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <Chat 
                rtKey="demo-chat"
                chatName="Demo Chat Room"
                className="h-96"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Try this:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Open this page in multiple tabs</li>
                <li>• Send messages from different tabs</li>
                <li>• Share the session URL with friends</li>
                <li>• Watch messages sync in real-time</li>
              </ul>
            </div>

            <CodeExample />
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeExample() {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h3 className="text-white font-semibold mb-3">Code Example</h3>
      <pre className="text-green-400 text-xs overflow-x-auto">
        <code>{`import { Chat } from 'react-together'

function MyChat() {
  return (
    <Chat 
      rtKey="my-chat"
      chatName="My Chat Room"
    />
  )
}`}</code>
      </pre>
    </div>
  )
}

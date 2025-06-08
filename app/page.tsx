'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MessageSquare, 
  MousePointer, 
  Users, 
  BarChart3, 
  Gamepad2, 
  FileText,
  ArrowRight,
  Github,
  ExternalLink
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to React Together
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Build collaborative, real-time applications with ease. This Next.js starter template 
          showcases the power of React Together for creating synchronized multi-user experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://react-together.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
          <a
            href="https://github.com/multisynq/react-together"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Quick Start</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <div>
              <p className="text-gray-900 font-medium">Get your API key</p>
              <p className="text-gray-600">
                Visit <a href="https://multisynq.io/coder" className="text-blue-600 hover:underline">multisynq.io/coder</a> to sign up for free
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <div>
              <p className="text-gray-900 font-medium">Share your session</p>
              <p className="text-gray-600">
                Click the "Session" button in the header to get a shareable link
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              3
            </div>
            <div>
              <p className="text-gray-900 font-medium">Explore the examples</p>
              <p className="text-gray-600">
                Try the demo pages below with multiple browser tabs or invite friends!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8" />}
          title="Real-time Chat"
          description="Built-in chat component with synchronized messages across all users"
          href="/chat"
          color="bg-green-500"
        />
        <FeatureCard
          icon={<MousePointer className="h-8 w-8" />}
          title="Live Cursors"
          description="See everyone's cursor movements in real-time with smooth animations"
          href="/cursors"
          color="bg-purple-500"
        />
        <FeatureCard
          icon={<BarChart3 className="h-8 w-8" />}
          title="Shared Counter"
          description="Synchronized state that updates instantly for all connected users"
          href="/counter"
          color="bg-blue-500"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8" />}
          title="User Presence"
          description="Track who's online and see hover interactions across users"
          href="/presence"
          color="bg-orange-500"
        />
        <FeatureCard
          icon={<Gamepad2 className="h-8 w-8" />}
          title="Interactive Game"
          description="Simple collaborative game demonstrating synchronized actions"
          href="/game"
          color="bg-red-500"
        />
        <FeatureCard
          icon={<FileText className="h-8 w-8" />}
          title="Collaborative Text"
          description="Shared text editor with real-time collaboration features"
          href="/editor"
          color="bg-indigo-500"
        />
      </div>

      {/* Connection Status */}
      <ConnectionStatus />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}

function FeatureCard({ icon, title, description, href, color }: FeatureCardProps) {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className={`${color} text-white rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-blue-600 group-hover:text-blue-700">
          <span className="text-sm font-medium">Try it out</span>
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  )
}

function ConnectionStatus() {
  const { useIsTogether, useConnectedUsers, useJoinUrl } = require('react-together')
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()
  const joinUrl = useJoinUrl()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Connection Status</h2>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isTogether ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-gray-900">
            {isTogether ? 'Connected to session' : 'Not connected'}
          </span>
        </div>
        {isTogether && (
          <>
            <div className="flex items-center space-x-3">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-gray-900">
                {connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''} online
              </span>
            </div>
            {joinUrl && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600 mb-2">Share this URL to invite others:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={joinUrl}
                    readOnly
                    className="flex-1 px-2 py-1 text-xs border rounded bg-white"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(joinUrl)}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

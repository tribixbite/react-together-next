'use client'

import Link from 'next/link'
import { ArrowLeft, BarChart3, Plus, Minus, RotateCcw } from 'lucide-react'
import { useStateTogether, useIsTogether } from 'react-together'

export default function CounterPage() {
  const isTogether = useIsTogether()
  
  const [count, setCount] = useStateTogether('shared-counter', 0)
  const [userCounts, setUserCounts] = useStateTogether('user-specific-counters', {})

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Counter Demo</h1>
          <p className="text-gray-600">
            Please connect to a session to use the shared counter.
          </p>
        </div>
      </div>
    )
  }

  const incrementCounter = () => setCount(prev => prev + 1)
  const decrementCounter = () => setCount(prev => prev - 1)
  const resetCounter = () => setCount(0)

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
            <h1 className="text-3xl font-bold text-gray-900">Shared Counter</h1>
            <p className="text-gray-600 mt-1">
              A simple counter that synchronizes across all connected users
            </p>
          </div>
        </div>

        {/* Main Counter Display */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{count}</div>
            <p className="text-gray-600">Shared across all users</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={decrementCounter}
              className="flex items-center justify-center w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <Minus className="h-6 w-6" />
            </button>
            <button
              onClick={resetCounter}
              className="flex items-center justify-center w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={incrementCounter}
              className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Multiple Counters Demo */}
        <MultipleCountersDemo />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            title="Instant Sync"
            description="Changes appear immediately on all connected devices"
            color="bg-green-500"
          />
          <FeatureCard
            title="Conflict Resolution"
            description="React Together handles concurrent updates gracefully"
            color="bg-blue-500"
          />
          <FeatureCard
            title="Persistent State"
            description="Counter value persists when users join/leave the session"
            color="bg-purple-500"
          />
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-yellow-900 mb-2">Try this experiment:</h3>
          <ol className="list-decimal list-inside text-yellow-800 space-y-1">
            <li>Open this page in multiple browser tabs</li>
            <li>Click the + and - buttons rapidly in different tabs</li>
            <li>Notice how the counter stays synchronized</li>
            <li>Share your session URL and have others join</li>
            <li>Watch the counter update from multiple users simultaneously</li>
          </ol>
        </div>

        {/* Code Example */}
        <CodeExample />
      </div>
    </div>
  )
}

function MultipleCountersDemo() {
  const [counter1, setCounter1] = useStateTogether('counter-1', 0)
  const [counter2, setCounter2] = useStateTogether('counter-2', 0)
  const [counter3, setCounter3] = useStateTogether('counter-3', 0)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Multiple Synchronized Counters</h2>
      <p className="text-gray-600 mb-6">
        Each counter has its own unique key and maintains separate state
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CounterWidget
          title="Counter A"
          value={counter1}
          onIncrement={() => setCounter1(prev => prev + 1)}
          onDecrement={() => setCounter1(prev => prev - 1)}
          color="bg-red-500"
        />
        <CounterWidget
          title="Counter B"
          value={counter2}
          onIncrement={() => setCounter2(prev => prev + 1)}
          onDecrement={() => setCounter2(prev => prev - 1)}
          color="bg-green-500"
        />
        <CounterWidget
          title="Counter C"
          value={counter3}
          onIncrement={() => setCounter3(prev => prev + 1)}
          onDecrement={() => setCounter3(prev => prev - 1)}
          color="bg-blue-500"
        />
      </div>
    </div>
  )
}

function CounterWidget({ title, value, onIncrement, onDecrement, color }: {
  title: string
  value: number
  onIncrement: () => void
  onDecrement: () => void
  color: string
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-800 mb-3">{value}</div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={onDecrement}
          className={`${color} hover:opacity-80 text-white px-3 py-1 rounded transition-opacity`}
        >
          -
        </button>
        <button
          onClick={onIncrement}
          className={`${color} hover:opacity-80 text-white px-3 py-1 rounded transition-opacity`}
        >
          +
        </button>
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
        <code>{`import { useStateTogether } from 'react-together'

function SharedCounter() {
  const [count, setCount] = useStateTogether('my-counter', 0)
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        Decrement
      </button>
    </div>
  )
}`}</code>
      </pre>
    </div>
  )
}

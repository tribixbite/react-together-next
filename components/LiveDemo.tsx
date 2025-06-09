'use client'

import { useState } from 'react'
import { useIsTogether, useConnectedUsers, useStateTogether, useMyId } from 'react-together'

interface LiveDemoWrapperProps {
  title: string
  isConnected: boolean
  children: React.ReactNode
}

export function LiveDemoWrapper({ title, isConnected, children }: LiveDemoWrapperProps) {
  return (
    <div className="card hover-lift">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isConnected 
              ? 'bg-green-400 pulse-glow' 
              : 'bg-red-400'
          }`}></div>
          <span className="text-sm text-text-muted">
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>
      </div>
      {children}
    </div>
  )
}

interface CollaborativeButtonProps {
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
}

export function CollaborativeButton({ 
  onClick, 
  disabled = false, 
  variant = 'secondary',
  children, 
  className = '' 
}: CollaborativeButtonProps) {
  const baseClass = variant === 'primary' 
    ? 'btn-primary' 
    : 'btn-secondary'
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  )
}

interface UserIndicatorProps {
  userId: string
  nickname: string
  isOnline?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function UserIndicator({ 
  userId, 
  nickname, 
  isOnline = true, 
  size = 'md' 
}: UserIndicatorProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base'
  }
  
  // Generate a consistent color based on userId
  const colors = [
    'bg-purple-500',
    'bg-blue-500', 
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-cyan-500'
  ]
  
  const colorIndex = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  const bgColor = colors[colorIndex]
  
  return (
    <div className="relative">
      <div className={`
        ${sizeClasses[size]} 
        ${bgColor}
        rounded-full 
        flex items-center justify-center 
        text-white font-semibold
        ring-2 ring-background
      `}>
        {nickname.charAt(0).toUpperCase()}
      </div>
      {isOnline && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background"></div>
      )}
    </div>
  )
}

interface LiveCounterDisplayProps {
  value: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LiveCounterDisplay({ 
  value, 
  label = 'Count', 
  size = 'md' 
}: LiveCounterDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  }
  
  return (
    <div className="text-center">
      <div className={`${sizeClasses[size]} font-bold text-gradient mb-2`}>
        {value}
      </div>
      <div className="text-sm text-text-muted">{label}</div>
    </div>
  )
}

interface LiveActivityIndicatorProps {
  activity: string
  timestamp: number
  userId: string
}

export function LiveActivityIndicator({ 
  activity, 
  timestamp, 
  userId 
}: LiveActivityIndicatorProps) {
  const timeAgo = Date.now() - timestamp
  const secondsAgo = Math.floor(timeAgo / 1000)
  
  let timeText = 'just now'
  if (secondsAgo > 60) {
    timeText = `${Math.floor(secondsAgo / 60)}m ago`
  } else if (secondsAgo > 5) {
    timeText = `${secondsAgo}s ago`
  }
  
  return (
    <div className="flex items-center space-x-2 text-sm text-text-muted fade-in">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <span>{userId.slice(0, 8)} {activity}</span>
      <span className="text-text-subtle">• {timeText}</span>
    </div>
  )
}

export function ConnectionStatusBadge() {
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()
  
  if (!isTogether) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        <span>Disconnected</span>
      </div>
    )
  }
  
  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
      <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
      <span>Live ({connectedUsers.length})</span>
    </div>
  )
}

interface FloatingCursorProps {
  x: number
  y: number
  userId: string
  nickname: string
  color?: string
}

export function FloatingCursor({ 
  x, 
  y, 
  userId, 
  nickname, 
  color = '#8b5cf6' 
}: FloatingCursorProps) {
  return (
    <div 
      className="absolute pointer-events-none z-50 transition-all duration-100 ease-out"
      style={{ 
        left: x - 6, 
        top: y - 6,
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      {/* Cursor dot */}
      <div 
        className="w-3 h-3 rounded-full border-2 border-white shadow-lg"
        style={{ backgroundColor: color }}
      />
      
      {/* Nickname label */}
      <div 
        className="absolute top-4 left-2 px-2 py-1 rounded text-xs font-medium text-white shadow-lg whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {nickname}
      </div>
    </div>
  )
}

// Interactive Demo Components

interface Stroke {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  timestamp: number
}

export function SharedDrawingDemo() {
  const isTogether = useIsTogether()
  const connectedUsers = useConnectedUsers()
  const [strokes, setStrokes] = useStateTogether('drawing-strokes', [] as Stroke[])
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTogether) return
    setIsDrawing(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setLastPoint(point)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !isTogether) return
    const rect = e.currentTarget.getBoundingClientRect()
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    
    const newStroke: Stroke = {
      id: Date.now() + Math.random(),
      x1: lastPoint.x,
      y1: lastPoint.y,
      x2: point.x,
      y2: point.y,
      color: '#8b5cf6',
      timestamp: Date.now()
    }
    
    setStrokes(prev => [...prev, newStroke])
    setLastPoint(point)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (isTogether) {
      setStrokes([])
    }
  }

  return (
    <LiveDemoWrapper title="Collaborative Drawing" isConnected={isTogether}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted">
            {connectedUsers.length} artist{connectedUsers.length !== 1 ? 's' : ''} online
          </span>
          <CollaborativeButton 
            onClick={clearCanvas}
            disabled={!isTogether}
            variant="secondary"
            className="text-xs px-3 py-1"
          >
            Clear Canvas
          </CollaborativeButton>
        </div>
        
        <div 
          className="relative w-full h-64 bg-surface rounded-lg border border-border cursor-crosshair overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg className="absolute inset-0 w-full h-full">
            {strokes.map(stroke => (
              <line
                key={stroke.id}
                x1={stroke.x1}
                y1={stroke.y1}
                x2={stroke.x2}
                y2={stroke.y2}
                stroke={stroke.color}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>
          
          {strokes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-text-subtle text-sm">
              Click and drag to draw together!
            </div>
          )}
        </div>
        
        <div className="text-xs text-text-subtle">
          {strokes.length} stroke{strokes.length !== 1 ? 's' : ''} on canvas
        </div>
      </div>
    </LiveDemoWrapper>
  )
}

interface Todo {
  id: number
  text: string
  completed: boolean
  createdBy: string | null
  createdAt: number
}

export function CollaborativeTodoDemo() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const [todos, setTodos] = useStateTogether('todos', [] as Todo[])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (!newTodo.trim() || !isTogether) return
    
    const todo: Todo = {
      id: Date.now() + Math.random(),
      text: newTodo.trim(),
      completed: false,
      createdBy: myId,
      createdAt: Date.now()
    }
    
    setTodos(prev => [todo, ...prev])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    if (!isTogether) return
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    if (!isTogether) return
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <LiveDemoWrapper title="Shared Todo List" isConnected={isTogether}>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            disabled={!isTogether}
            className="input flex-1 text-sm"
          />
          <CollaborativeButton
            onClick={addTodo}
            disabled={!isTogether || !newTodo.trim()}
            variant="primary"
          >
            Add
          </CollaborativeButton>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {todos.length === 0 ? (
            <div className="text-center text-text-subtle text-sm py-8">
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map(todo => (
              <div 
                key={todo.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  todo.completed 
                    ? 'bg-surface opacity-60' 
                    : 'bg-surface-hover'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  disabled={!isTogether}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-primary border-primary text-white'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <span className={`flex-1 text-sm ${
                  todo.completed 
                    ? 'line-through text-text-subtle' 
                    : 'text-white'
                }`}>
                  {todo.text}
                </span>
                
                <UserIndicator 
                  userId={todo.createdBy || 'unknown'}
                  nickname={todo.createdBy?.slice(0, 8) || 'unknown'}
                  size="sm"
                />
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  disabled={!isTogether}
                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="text-xs text-text-subtle">
          {todos.filter(t => !t.completed).length} active, {todos.filter(t => t.completed).length} completed
        </div>
      </div>
    </LiveDemoWrapper>
  )
}

export function LiveVotingDemo() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const connectedUsers = useConnectedUsers()
  const [votes, setVotes] = useStateTogether('poll-votes', {} as Record<string, string>)
  const [question] = useStateTogether('poll-question', 'What\'s your favorite color?')
  const [options] = useStateTogether('poll-options', ['Red', 'Blue', 'Green', 'Purple'])

  const vote = (option: string) => {
    if (!isTogether || !myId) return
    
    setVotes(prev => ({
      ...prev,
      [myId]: option
    }))
  }

  const getVoteCount = (option: string) => {
    return Object.values(votes).filter(vote => vote === option).length
  }

  const getTotalVotes = () => {
    return Object.keys(votes).length
  }

  const getPercentage = (option: string) => {
    const total = getTotalVotes()
    if (total === 0) return 0
    return Math.round((getVoteCount(option) / total) * 100)
  }

  const myVote = myId ? votes[myId] : null

  return (
    <LiveDemoWrapper title="Live Voting Poll" isConnected={isTogether}>
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-lg font-medium text-white mb-2">{question}</h4>
          <p className="text-sm text-text-muted">
            {getTotalVotes()} vote{getTotalVotes() !== 1 ? 's' : ''} from {connectedUsers.length} user{connectedUsers.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="space-y-3">
          {options.map(option => {
            const count = getVoteCount(option)
            const percentage = getPercentage(option)
            const isSelected = myVote === option
            
            return (
              <button
                key={option}
                onClick={() => vote(option)}
                disabled={!isTogether}
                className={`w-full p-3 rounded-lg border transition-all text-left relative overflow-hidden ${
                  isSelected
                    ? 'border-primary bg-primary/20 text-white'
                    : 'border-border bg-surface hover:bg-surface-hover text-text'
                }`}
              >
                <div 
                  className="absolute left-0 top-0 h-full bg-primary/10 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
                
                <div className="relative flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-text-muted">{count}</span>
                    <span className="text-xs text-text-subtle">({percentage}%)</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        
        {myVote && (
          <div className="text-center text-sm text-primary">
            You voted for: {myVote}
          </div>
        )}
      </div>
    </LiveDemoWrapper>
  )
}

export function SimpleGameDemo() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const [gameBoard, setGameBoard] = useStateTogether('tic-tac-toe', Array(9).fill(null) as (string | null)[])
  const [currentPlayer, setCurrentPlayer] = useStateTogether('current-player', 'X')
  const [gameWinner, setGameWinner] = useStateTogether('game-winner', null as string | null)

  const makeMove = (index: number) => {
    if (!isTogether || gameBoard[index] || gameWinner) return
    
    const newBoard = [...gameBoard]
    newBoard[index] = currentPlayer
    setGameBoard(newBoard)
    
    // Check for winner
    const winner = checkWinner(newBoard)
    if (winner) {
      setGameWinner(winner)
    } else if (newBoard.every(cell => cell !== null)) {
      setGameWinner('tie')
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    if (!isTogether) return
    setGameBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameWinner(null)
  }

  const checkWinner = (board: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]
    
    for (let line of lines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }

  return (
    <LiveDemoWrapper title="Tic-Tac-Toe" isConnected={isTogether}>
      <div className="space-y-4">
        <div className="text-center">
          {gameWinner ? (
            <div className="space-y-2">
              <div className="text-lg font-bold text-primary">
                {gameWinner === 'tie' ? 'It\'s a tie!' : `Player ${gameWinner} wins!`}
              </div>
              <CollaborativeButton
                onClick={resetGame}
                disabled={!isTogether}
                variant="primary"
              >
                New Game
              </CollaborativeButton>
            </div>
          ) : (
            <div className="text-lg font-medium text-white">
              Current player: <span className="text-primary">{currentPlayer}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {gameBoard.map((cell, index) => (
            <button
              key={index}
              onClick={() => makeMove(index)}
              disabled={!isTogether || cell !== null || !!gameWinner}
              className="aspect-square bg-surface hover:bg-surface-hover border border-border rounded-lg flex items-center justify-center text-2xl font-bold transition-colors"
            >
              <span className={cell === 'X' ? 'text-primary' : 'text-accent'}>
                {cell}
              </span>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-text-subtle text-center">
          Play with others in real-time!
        </div>
      </div>
    </LiveDemoWrapper>
  )
}

interface LastEdit {
  userId: string
  timestamp: number
}

export function LiveTextEditorDemo() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const [editorContent, setEditorContent] = useStateTogether('shared-editor', '')
  const [lastEdit, setLastEdit] = useStateTogether('last-edit', { userId: '', timestamp: 0 } as LastEdit)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTogether || !myId) return
    
    const newContent = e.target.value
    setEditorContent(newContent)
    setLastEdit({ userId: myId, timestamp: Date.now() })
  }

  const getTimeSinceLastEdit = () => {
    if (!lastEdit.timestamp) return ''
    const seconds = Math.floor((Date.now() - lastEdit.timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  }

  return (
    <LiveDemoWrapper title="Shared Text Editor" isConnected={isTogether}>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">
            {editorContent.length} characters
          </span>
          {lastEdit.userId && (
            <span className="text-text-subtle">
              Last edit by {lastEdit.userId.slice(0, 8)} {getTimeSinceLastEdit()}
            </span>
          )}
        </div>
        
        <textarea
          value={editorContent}
          onChange={handleTextChange}
          disabled={!isTogether}
          placeholder="Start typing to collaborate in real-time..."
          className="input w-full h-32 resize-none text-sm font-mono"
        />
        
        <div className="text-xs text-text-subtle">
          Changes sync instantly across all users
        </div>
      </div>
    </LiveDemoWrapper>
  )
}

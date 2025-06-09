'use client'

import Link from 'next/link'
import { ArrowLeft, Gamepad2, Trophy, RotateCcw, Users } from 'lucide-react'
import { useIsTogether, useMyId, useConnectedUsers, useStateTogether } from 'react-together'

interface ConnectedUser {
  userId: string
  nickname?: string
}

type Player = 'X' | 'O'
type GameStatus = 'waiting' | 'playing' | 'finished'
type Winner = Player | 'tie' | null

export default function GamePage() {
  const isTogether = useIsTogether()
  const myId = useMyId()
  const connectedUsers = useConnectedUsers() as ConnectedUser[]

  // Game state with proper typing
  const [gameBoard, setGameBoard] = useStateTogether('game-board', Array(9).fill(null) as (Player | null)[])
  const [currentPlayer, setCurrentPlayer] = useStateTogether('current-player', 'X' as Player)
  const [gameStatus, setGameStatus] = useStateTogether('game-status', 'waiting' as GameStatus)
  const [winner, setWinner] = useStateTogether('winner', null as Winner)

  // Player assignments with proper typing
  const [playerX, setPlayerX] = useStateTogether('player-x', null as string | null)
  const [playerO, setPlayerO] = useStateTogether('player-o', null as string | null)

  // Player scores with proper typing
  const [scores, setScores] = useStateTogether('scores', {} as Record<string, number>)

  if (!isTogether) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collaborative Game</h1>
          <p className="text-gray-600">
            Please connect to a session to play the game.
          </p>
        </div>
      </div>
    )
  }

  const checkWinner = (board: (Player | null)[]): Winner => {
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

    if (board.every(cell => cell !== null)) {
      return 'tie'
    }

    return null
  }

  const makeMove = (index: number) => {
    if (gameBoard[index] || gameStatus !== 'playing') return
    if ((currentPlayer === 'X' && myId !== playerX) || (currentPlayer === 'O' && myId !== playerO)) return

    const newBoard = [...gameBoard]
    newBoard[index] = currentPlayer
    setGameBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      setGameStatus('finished')

      // Update scores - fix the type error by checking winnerId is not null
      if (gameWinner !== 'tie') {
        const winnerId = gameWinner === 'X' ? playerX : playerO
        if (winnerId) {
          setScores(prev => ({
            ...prev,
            [winnerId]: (prev[winnerId] || 0) + 1
          }))
        }
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const joinAsPlayer = (symbol: Player) => {
    if (!myId) return
    
    if (symbol === 'X' && !playerX) {
      setPlayerX(myId)
    } else if (symbol === 'O' && !playerO) {
      setPlayerO(myId)
    }

    if (playerX && playerO && gameStatus === 'waiting') {
      setGameStatus('playing')
    }
  }

  const resetGame = () => {
    setGameBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setGameStatus(playerX && playerO ? 'playing' : 'waiting')
    setWinner(null)
  }

  const resetEverything = () => {
    resetGame()
    setPlayerX(null)
    setPlayerO(null)
    setScores({})
    setGameStatus('waiting')
  }

  const getUserNickname = (userId: string | null): string => {
    if (!userId) return 'Unknown'
    const user = connectedUsers.find(u => u.userId === userId)
    return user?.nickname || userId
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
            <h1 className="text-3xl font-bold text-gray-900">Collaborative Tic-Tac-Toe</h1>
            <p className="text-gray-600 mt-1">
              A synchronized multiplayer game built with React Together
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Game Board</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={resetGame}
                    className="flex items-center px-3 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    New Game
                  </button>
                  <button
                    onClick={resetEverything}
                    className="flex items-center px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              {/* Game Status */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                {gameStatus === 'waiting' && (
                  <p className="text-center text-gray-600">
                    Waiting for players to join...
                  </p>
                )}
                {gameStatus === 'playing' && (
                  <p className="text-center text-gray-900">
                    Current turn: <span className="font-bold text-blue-600">
                      {currentPlayer} ({getUserNickname(currentPlayer === 'X' ? playerX : playerO)})
                    </span>
                  </p>
                )}
                {gameStatus === 'finished' && (
                  <p className="text-center text-gray-900">
                    {winner === 'tie' ? (
                      <span className="text-yellow-600 font-bold">It's a tie! 🤝</span>
                    ) : winner ? (
                      <span className="text-green-600 font-bold">
                        {winner} wins! 🎉 ({getUserNickname(winner === 'X' ? playerX : playerO)})
                      </span>
                    ) : null}
                  </p>
                )}
              </div>

              {/* Tic-Tac-Toe Board */}
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                {gameBoard.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => makeMove(index)}
                    className={`
                      w-20 h-20 border-2 border-gray-300 rounded-lg text-2xl font-bold
                      ${cell ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}
                      ${cell === 'X' ? 'text-blue-600' : 'text-red-600'}
                      ${gameStatus === 'playing' && !cell &&
                        ((currentPlayer === 'X' && myId === playerX) || (currentPlayer === 'O' && myId === playerO))
                        ? 'cursor-pointer' : 'cursor-not-allowed'}
                    `}
                    disabled={!!cell || gameStatus !== 'playing' ||
                      (currentPlayer === 'X' && myId !== playerX) ||
                      (currentPlayer === 'O' && myId !== playerO)}
                  >
                    {cell}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Game Info Panel */}
          <div className="space-y-6">
            {/* Player Assignment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Players</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      X
                    </div>
                    <div>
                      {playerX ? (
                        <div>
                          <p className="font-medium text-gray-900">{getUserNickname(playerX)}</p>
                          <p className="text-xs text-gray-500">Player X</p>
                        </div>
                      ) : (
                        <p className="text-gray-600">Empty slot</p>
                      )}
                    </div>
                  </div>
                  {!playerX && myId !== playerO && (
                    <button
                      onClick={() => joinAsPlayer('X')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Join as X
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                      O
                    </div>
                    <div>
                      {playerO ? (
                        <div>
                          <p className="font-medium text-gray-900">{getUserNickname(playerO)}</p>
                          <p className="text-xs text-gray-500">Player O</p>
                        </div>
                      ) : (
                        <p className="text-gray-600">Empty slot</p>
                      )}
                    </div>
                  </div>
                  {!playerO && myId !== playerX && (
                    <button
                      onClick={() => joinAsPlayer('O')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Join as O
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Scoreboard</h3>
              </div>

              {Object.keys(scores).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(scores)
                    .sort(([, a], [, b]) => (b as number) - (a as number))
                    .map(([userId, score]) => (
                      <div key={userId} className="flex justify-between items-center">
                        <span className="text-gray-900">{getUserNickname(userId)}</span>
                        <span className="font-bold text-blue-600">{score as number}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No games completed yet</p>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">How to Play</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Join as Player X or O</li>
                <li>• Take turns placing marks</li>
                <li>• Get 3 in a row to win</li>
                <li>• Share session for multiplayer</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Collaborative Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Gamepad2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Real-time Moves</h3>
              <p className="text-sm text-gray-600">All moves sync instantly across players</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Turn Management</h3>
              <p className="text-sm text-gray-600">Synchronized turn tracking prevents conflicts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Shared Scoring</h3>
              <p className="text-sm text-gray-600">Persistent scoreboard for all players</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

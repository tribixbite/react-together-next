# Getting Started with React Together

This guide will help you understand how to use React Together in your Next.js application.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install react-together@latest
npm install @tailwindcss/browser@4.0.0-alpha.27
```

### 2. Wrap Your App

```tsx
import { ReactTogether } from 'react-together'

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        appId: 'your-unique-app-id',
        apiKey: 'your-api-key',
        name: 'session-name',
        password: 'session-password'
      }}
      rememberUsers={true}
    >
      {/* Your app components */}
    </ReactTogether>
  )
}
```

### 3. Use React Together Hooks

```tsx
import { useStateTogether } from 'react-together'

function Counter() {
  const [count, setCount] = useStateTogether('counter', 0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

## 🛠️ Core Concepts

### Shared State

Use `useStateTogether` to create state that's synchronized across all users:

```tsx
const [sharedValue, setSharedValue] = useStateTogether('unique-key', initialValue)
```

### Per-User State

Use `useStateTogetherWithPerUserValues` when each user needs their own value:

```tsx
const [myValue, setMyValue, allValues] = useStateTogetherWithPerUserValues('user-key', initialValue)
```

### Synchronized Functions

Use `useFunctionTogether` to call a function on all connected clients:

```tsx
const notifyEveryone = useFunctionTogether('notify', useCallback((message) => {
  alert(message)
}, []))
```

### User Presence

Track who's online and their interactions:

```tsx
const connectedUsers = useConnectedUsers()
const [nickname, setNickname] = useNicknames()
const [hoverRef, hoveringUsers] = useHoveringUsers('element-id')
```

### Real-time Chat

Add chat functionality with a single hook:

```tsx
const { messages, sendMessage } = useChat('chat-room')
```

### Live Cursors

Show cursor positions for all users:

```tsx
const { myCursor, allCursors } = useCursors()
```

## 📝 Best Practices

### 1. Use Unique Keys

Always use unique, descriptive keys for your shared state:

```tsx
// ✅ Good
const [gameBoard, setGameBoard] = useStateTogether('tic-tac-toe-board', initialBoard)

// ❌ Avoid
const [data, setData] = useStateTogether('data', {})
```

### 2. Handle Disconnections

Always check if the user is connected before using collaborative features:

```tsx
const isTogether = useIsTogether()

if (!isTogether) {
  return <div>Please connect to a session...</div>
}
```

### 3. Optimize Performance

Use throttling for rapid updates like cursor movements:

```tsx
useStateTogether('cursor-pos', position, { throttleDelay: 50 })
```

### 4. Provide Fallbacks

Always provide sensible initial values and fallbacks:

```tsx
const [settings, setSettings] = useStateTogether('app-settings', {
  theme: 'light',
  notifications: true
})
```

## 🎯 Common Patterns

### Collaborative Form

```tsx
function CollaborativeForm() {
  const [formData, setFormData] = useStateTogether('form', {
    name: '',
    email: '',
    message: ''
  })
  
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        placeholder="Message"
      />
    </form>
  )
}
```

### Turn-Based Game

```tsx
function TurnBasedGame() {
  const [currentPlayer, setCurrentPlayer] = useStateTogether('current-player', 'player1')
  const [gameState, setGameState] = useStateTogether('game-state', 'waiting')
  const myId = useMyId()
  
  const makeMove = (move: any) => {
    if (currentPlayer === myId && gameState === 'playing') {
      // Process move
      setCurrentPlayer(getNextPlayer())
    }
  }
  
  return (
    <div>
      <p>Current Player: {currentPlayer}</p>
      <button 
        onClick={() => makeMove('example')}
        disabled={currentPlayer !== myId}
      >
        Make Move
      </button>
    </div>
  )
}
```

### Activity Feed

```tsx
function ActivityFeed() {
  const [activities, setActivities] = useStateTogether('activities', [])
  const myId = useMyId()
  
  const addActivity = useFunctionTogether('add-activity', useCallback((activity) => {
    setActivities(prev => [activity, ...prev.slice(0, 49)]) // Keep last 50
  }, [setActivities]))
  
  const logActivity = (action: string) => {
    addActivity({
      id: Date.now(),
      userId: myId,
      action,
      timestamp: Date.now()
    })
  }
  
  return (
    <div>
      <button onClick={() => logActivity('clicked button')}>
        Do Something
      </button>
      
      <div>
        {activities.map(activity => (
          <div key={activity.id}>
            {activity.userId} {activity.action}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 🔧 Advanced Usage

### Custom Models

For complex state management, you can extend the base model:

```tsx
import { ReactTogetherModel } from 'react-together'

class GameModel extends ReactTogetherModel {
  init() {
    super.init({
      players: {},
      gameState: 'waiting',
      currentTurn: null
    })
    
    this.subscribe(this.id, 'player-join', this.handlePlayerJoin)
    this.subscribe(this.id, 'make-move', this.handleMove)
  }
  
  handlePlayerJoin(playerId: string) {
    this.state.players[playerId] = { score: 0, ready: false }
    this.publish([this.id, 'player-joined', playerId])
  }
  
  handleMove(move: any) {
    // Validate and process move
    if (this.isValidMove(move)) {
      this.applyMove(move)
      this.nextTurn()
    }
  }
}

GameModel.register('GameModel')
```

Then use it in your React Together provider:

```tsx
<ReactTogether
  sessionParams={{
    // ...other params
    model: GameModel
  }}
>
  <App />
</ReactTogether>
```

## 🐛 Debugging Tips

### 1. Check Connection Status

```tsx
const isTogether = useIsTogether()
const connectedUsers = useConnectedUsers()

console.log('Connected:', isTogether)
console.log('Users:', connectedUsers.length)
```

### 2. Monitor State Changes

```tsx
const [value, setValue] = useStateTogether('debug-key', null)

useEffect(() => {
  console.log('State changed:', value)
}, [value])
```

### 3. Use Browser DevTools

React Together state is visible in the React DevTools. Look for the ReactTogether provider context.

## 📚 Next Steps

- Explore the [official documentation](https://react-together.dev)
- Join the [Discord community](https://multisynq.io/discord)
- Check out more [examples on GitHub](https://github.com/multisynq/react-together)
- Build your own collaborative features!

## 🤝 Need Help?

- Check the [FAQ](https://react-together.dev/faq)
- Search [GitHub Issues](https://github.com/multisynq/react-together/issues)
- Ask on [Discord](https://multisynq.io/discord)
- Review the example code in this template

Happy collaborating! 🎉

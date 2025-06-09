# 🌟 React Together Next.js App

**A modern, real-time collaborative application built with React Together, Next.js 15, React 19, and Tailwind CSS.**

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🔄 **Real-time Collaboration** - Multiple users can interact simultaneously
- 🎨 **Modern Dark Theme** - Beautiful glass morphism design
- 🖱️ **Live Cursors** - See other users' mouse movements in real-time
- 💬 **Live Chat** - Built-in messaging system
- 🎯 **Interactive Demos** - Canvas painting, reactions, voting, and more
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Production Ready** - TypeScript, optimizations, and best practices

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/tribixbite/react-together-next.git
   cd react-together-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your React Together API key to .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open multiple browser tabs**
   Visit `http://localhost:3000` in multiple tabs to see real-time collaboration!

## 🎯 Live Demo

🌐 **[View Live Demo](https://tribixbite.github.io/react-together-next/)**

Try opening the demo in multiple browser windows to experience real-time collaboration.

## 📱 App Features

### 🏠 Homepage
- Live counter with real-time synchronization
- Interactive chat with message history
- User presence indicators
- Session sharing capabilities

### 🎪 Showcase Page
- **Collaborative Canvas** - Paint pixels together in real-time
- **Live Reactions** - Share emoji reactions with other users
- **Live Cursors Demo** - See cursor movements in a demo area
- **Team Voting** - Vote on options and see live results
- **Real-time Metrics** - Session statistics and user counts
- **Live Activity Feed** - Track all user interactions

### 🎮 Additional Pages
- **Chat** - Dedicated messaging interface
- **Counter** - Simple collaborative counter
- **Game** - Tic-tac-toe with real-time gameplay
- **Presence** - User presence and activity tracking

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[React Together](https://react-together.dev/)** - Real-time collaboration hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 🎨 Key Components

### Real-time State Management
```tsx
import { useStateTogether } from 'react-together'

function Counter() {
  const [count, setCount] = useStateTogether('counter', 0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### Live Cursors
```tsx
import { useCursors } from 'react-together'

function CursorDemo() {
  const { allCursors } = useCursors({ deleteOnLeave: true })
  
  return (
    <div className="relative">
      {Object.entries(allCursors).map(([userId, cursor]) => (
        <div
          key={userId}
          className="absolute w-2 h-2 bg-emerald-500 rounded-full"
          style={{
            left: `${cursor.percentX * 100}%`,
            top: `${cursor.percentY * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
```

### User Presence
```tsx
import { useConnectedUsers } from 'react-together'

function UserList() {
  const connectedUsers = useConnectedUsers()
  
  return (
    <div>
      {connectedUsers.map(user => (
        <div key={user.userId}>
          {user.nickname || user.userId}
          {user.isYou && ' (You)'}
        </div>
      ))}
    </div>
  )
}
```

## 📁 Project Structure

```
react-together-next/
├── app/                    # Next.js app directory
│   ├── chat/              # Chat page
│   ├── counter/           # Counter demo
│   ├── game/              # Tic-tac-toe game
│   ├── presence/          # Presence tracking
│   ├── showcase/          # Main showcase page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ReactTogetherWrapper.tsx
│   └── SessionSettings.tsx
├── lib/                   # Utilities
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with your React Together credentials:

```env
NEXT_PUBLIC_DEFAULT_APP_ID=your-app-id
NEXT_PUBLIC_MULTISYNQ_API_KEY=your-api-key
NEXT_PUBLIC_DEFAULT_SESSION_NAME=your-session-name
NEXT_PUBLIC_DEFAULT_SESSION_PASSWORD=your-password
```

Get your API key from [React Together](https://react-together.dev/).

## 🚀 Deployment

This app is automatically deployed to GitHub Pages using GitHub Actions.

### Manual Deployment

You can also deploy to other platforms:

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Upload the `out` folder to Netlify
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Together](https://react-together.dev/) for the amazing real-time collaboration framework
- [Multisynq](https://multisynq.io/) for the infrastructure
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

---

<div align="center">

**🌟 Star this repo if you found it helpful! 🌟**

[🚀 Live Demo](https://tribixbite.github.io/react-together-next/) • [📖 React Together Docs](https://react-together.dev/) • [💬 Discord](https://multisynq.io/discord)

</div>
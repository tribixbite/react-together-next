# Next.js + React Together Starter Template

A comprehensive starter template for building collaborative, real-time applications using [React Together](https://react-together.dev), [Next.js 15](https://nextjs.org), [React 19](https://react.dev), and [Tailwind CSS 4](https://tailwindcss.com).

## 🆕 Latest Tech Stack

- **React 19** with React Compiler for automatic optimizations
- **Next.js 15** with App Router and enhanced performance
- **Tailwind CSS 4** (Alpha) with CSS-based configuration
- **TypeScript** for type safety
- **React Together** for real-time collaboration

> ⚠️ **Note**: This template uses Tailwind CSS 4 Alpha. For production applications, you may want to use the stable Tailwind CSS 3.x version.

## 🚀 Quick Start

### 1. Get Your API Key

Visit [multisynq.io/coder](https://multisynq.io/coder) to sign up for a free MultiSynq API key (no credit card required).

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) and enter your API key when prompted.

### 5. Test Collaboration

- Open the same URL in multiple browser tabs
- Or share your session URL with others
- Try the different demo pages to see real-time collaboration in action!

## 📁 Project Structure

```
next-react-together/
├── app/                    # Next.js app directory
│   ├── chat/              # Real-time chat demo
│   ├── counter/           # Shared state demo  
│   ├── cursors/           # Live cursors demo
│   ├── editor/            # Collaborative text editor
│   ├── game/              # Multiplayer tic-tac-toe
│   ├── presence/          # User presence tracking
│   ├── globals.css        # Global styles with Tailwind 4 config
│   ├── layout.tsx         # Root layout with React Together provider
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎯 Demo Pages

### 💬 Chat (`/chat`)
- Real-time messaging with `useChat` hook
- Built-in `<Chat />` component
- User identification and message history

### 🖱️ Live Cursors (`/cursors`)
- Real-time cursor tracking with `useCursors`
- Smooth cursor animations
- Interactive playground areas

### 🔢 Shared Counter (`/counter`)
- Synchronized state with `useStateTogether`
- Multiple independent counters
- Conflict resolution demonstration

### 👥 User Presence (`/presence`)
- Connected users with `useConnectedUsers`
- Hover tracking with `useHoveringUsers`
- Nickname management with `useNicknames`

### 🎮 Collaborative Game (`/game`)
- Multiplayer tic-tac-toe
- Turn-based gameplay
- Shared scoreboard and game state

### 📝 Text Editor (`/editor`)
- Collaborative text editing
- Real-time cursor positions
- Activity feed and document statistics

## 🛠️ Key Features Demonstrated

### Core Hooks
- `useStateTogether` - Shared state synchronization
- `useStateTogetherWithPerUserValues` - Per-user state management
- `useFunctionTogether` - Synchronized function calls
- `useChat` - Real-time messaging
- `useCursors` - Live cursor tracking
- `useHoveringUsers` - Hover interaction tracking
- `useConnectedUsers` - User presence
- `useNicknames` - User identity management

### Ready-to-Use Components
- `<Chat />` - Complete chat interface
- `<Cursors />` - Live cursor display
- `<ConnectedUsers />` - User avatars
- `<HoverHighlighter />` - Hover interaction wrapper
- `<SessionManager />` - Session management UI

### Advanced Patterns
- Session sharing and URL management
- Real-time conflict resolution
- Persistent state across user sessions
- Activity tracking and notifications
- Responsive design with Tailwind CSS

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Set default session parameters
NEXT_PUBLIC_DEFAULT_APP_ID=your-app-id
NEXT_PUBLIC_DEFAULT_SESSION_NAME=your-default-session
NEXT_PUBLIC_DEFAULT_SESSION_PASSWORD=your-password
```

### Customizing the App ID

Edit `app/layout.tsx` and update the `sessionParams`:

```tsx
const [sessionParams, setSessionParams] = useState({
  appId: 'your-unique-app-id',        // Change this!
  apiKey: 'YOUR_API_KEY_HERE',
  name: 'default-session',
  password: 'demo123'
})
```

## 🎨 Styling

This template uses [Tailwind CSS 4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) (Alpha) for styling. Key design features:

- **CSS-based Configuration**: No more config files, everything in CSS
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark Mode Support**: Built-in dark mode compatibility using CSS custom properties
- **Custom Components**: Reusable UI components with consistent styling
- **Smooth Animations**: Hover effects and transitions
- **Accessible Colors**: High contrast and accessible color schemes

### Customizing Styles

Edit `app/globals.css` to customize the design system using the new `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  
  --font-family-custom: 'Your Custom Font', sans-serif;
  
  @media (prefers-color-scheme: dark) {
    --color-primary: #your-dark-primary;
  }
}
```

## 📱 Adding New Features

### Creating a New Demo Page

1. Create a new directory in `app/`:
```bash
mkdir app/my-feature
```

2. Add a `page.tsx` file:
```tsx
'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function MyFeaturePage() {
  const { useStateTogether, useIsTogether } = require('react-together')
  const isTogether = useIsTogether()

  if (!isTogether) {
    return <div>Please connect to a session...</div>
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Feature</h1>
        </div>
        {/* Your feature implementation */}
      </div>
    </div>
  )
}
```

3. Add your feature to the home page grid in `app/page.tsx`.

### Adding Custom Components

Create reusable components that leverage React Together:

```tsx
import { useStateTogether } from 'react-together'

export function MyCollaborativeComponent() {
  const [sharedData, setSharedData] = useStateTogether('my-key', 'initial-value')
  
  return (
    <div>
      <input 
        value={sharedData}
        onChange={(e) => setSharedData(e.target.value)}
      />
    </div>
  )
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This template works with any platform that supports Next.js:

- **Netlify**: Enable Next.js runtime
- **Railway**: Automatic Next.js detection
- **Heroku**: Use the Next.js buildpack
- **Docker**: Use the official Next.js Docker image

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Code Style**: Follow the existing patterns and use TypeScript
2. **Components**: Create reusable, well-documented components
3. **Examples**: Add comprehensive examples for new features
4. **Documentation**: Update README.md for new features

## 📚 Learn More

### React Together Resources
- [Official Documentation](https://react-together.dev)
- [GitHub Repository](https://github.com/multisynq/react-together)
- [Discord Community](https://multisynq.io/discord)

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js/)

### Tailwind CSS Resources
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)
- [Headless UI](https://headlessui.dev)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Together](https://react-together.dev) team for the amazing collaboration framework
- [Next.js](https://nextjs.org) team for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev) for the beautiful icon set

---

**Happy collaborating! 🎉**

If you have any questions or need help, feel free to reach out to the React Together community on [Discord](https://multisynq.io/discord).

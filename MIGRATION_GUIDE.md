# Migration to Stable Versions

If you prefer to use stable versions instead of the cutting-edge React 19 and Tailwind CSS 4, follow this guide.

## 🔄 Downgrade to Stable Versions

### Option 1: React 18 + Tailwind CSS 3

**Update package.json:**
```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8"
  }
}
```

**Remove Tailwind 4 script and restore configs:**

1. Remove the Tailwind script from `app/layout.tsx`:
```tsx
// Remove this line:
<script src="https://cdn.tailwindcss.com/4.0.0-alpha.27/tailwindcss.js"></script>
```

2. Create `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
```

3. Create `postcss.config.js`:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

4. Update `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

/* Rest of your styles... */
```

5. Update `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
```

### Option 2: Keep React 19, Use Tailwind CSS 3

If you want to keep React 19 but use stable Tailwind:

1. Update dependencies:
```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.1",
    "postcss": "^8"
  }
}
```

2. Follow steps 1-5 from Option 1 for Tailwind configuration.

## 🔧 After Migration

1. **Install dependencies:**
```bash
npm install
```

2. **Test your application:**
```bash
npm run dev
```

3. **Verify styling:**
Check that all Tailwind classes work correctly with the stable version.

## 💡 Why You Might Want Stable Versions

- **Production Reliability**: Stable versions have been thoroughly tested
- **Better IDE Support**: More complete TypeScript definitions
- **Wider Community Support**: More documentation and examples
- **Fewer Breaking Changes**: Less likely to encounter unexpected issues

## 🚀 Why You Might Want Cutting-Edge Versions

- **Latest Features**: Access to newest React and Tailwind capabilities
- **Better Performance**: React 19 Compiler optimizations
- **Future-Ready**: Early adoption of upcoming standards
- **Simpler Configuration**: Tailwind CSS 4's CSS-based config

Choose the option that best fits your project's needs! 🎯

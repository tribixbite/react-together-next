/**
 * Utility functions for React Together applications
 */

/**
 * Generate a random session name
 */
export function generateSessionName(): string {
  const adjectives = [
    'amazing', 'brilliant', 'creative', 'delightful', 'excellent', 'fantastic',
    'gorgeous', 'helpful', 'incredible', 'joyful', 'kind', 'lovely',
    'magnificent', 'nice', 'outstanding', 'perfect', 'quiet', 'remarkable',
    'stunning', 'terrific', 'unique', 'vibrant', 'wonderful', 'extraordinary'
  ]
  
  const nouns = [
    'elephant', 'giraffe', 'penguin', 'dolphin', 'butterfly', 'dragonfly',
    'hummingbird', 'octopus', 'starfish', 'seahorse', 'flamingo', 'peacock',
    'koala', 'panda', 'tiger', 'leopard', 'cheetah', 'kangaroo',
    'squirrel', 'rabbit', 'hedgehog', 'raccoon', 'fox', 'wolf'
  ]
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomNumber = Math.floor(Math.random() * 1000)
  
  return `${randomAdjective}-${randomNoun}-${randomNumber}`
}

/**
 * Generate a random session password
 */
export function generateSessionPassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Format a timestamp for display
 */
export function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) { // Less than 1 minute
    return 'just now'
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else {
    return new Date(timestamp).toLocaleDateString()
  }
}

/**
 * Debounce function for limiting rapid function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttle function for limiting function call frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Create a unique key for React Together state
 */
export function createStateKey(namespace: string, key: string): string {
  return `${namespace}:${key}`
}

/**
 * Validate session parameters
 */
export function validateSessionParams(params: {
  appId?: string
  apiKey?: string
  name?: string
  password?: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!params.appId || params.appId.trim() === '') {
    errors.push('App ID is required')
  }
  
  if (!params.apiKey || params.apiKey.trim() === '') {
    errors.push('API Key is required')
  }
  
  if (params.apiKey === 'YOUR_API_KEY_HERE') {
    errors.push('Please enter a valid API Key')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Get a random color for UI elements
 */
export function getRandomColor(): string {
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e'
  ]
  
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Check if the browser supports the Web Share API
 */
export function canWebShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator
}

/**
 * Check if the browser supports the Clipboard API
 */
export function canClipboard(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (canClipboard()) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (err) {
    console.error('Failed to copy text:', err)
    return false
  }
}

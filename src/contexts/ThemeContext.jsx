import { useEffect } from 'react'

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Always set dark theme
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  return <>{children}</>
}


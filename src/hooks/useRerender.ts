import { useState, useEffect } from 'react'

/**
 * Hook that forces a component to rerender at a specified interval
 * @param intervalMs - The interval in milliseconds between rerenders
 */
export function useRerender(intervalMs: number = 30000) {
  const [, setTimeUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUpdate((prev) => prev + 1)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs])
}

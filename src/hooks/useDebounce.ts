import { useEffect, useState } from 'react'
export function useDebounce(value: string | undefined, delay: number) {
  const [debValue, setDebValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [debValue, delay, value])
  return debValue
}
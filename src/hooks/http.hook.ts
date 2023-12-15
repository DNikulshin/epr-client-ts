import { useCallback, useState } from 'react'

// interface useHttpProps {
//     url: string
//     method: string
//     body: string | null
//     headers: HeadersInit
// }

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const request = useCallback(async (url: string, method: string = 'GET', body: string | null = null, headers: HeadersInit = { 'Content-Type': 'application/json' }) => {
        setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (e) {
            if(e instanceof Error) {
                setLoading(false)
                setError(e.message)
                throw e
            }
        }
    }, [])
    const clearError = useCallback(() => setError(''), [])
    return {
        loading, request, error, clearError
    }
}

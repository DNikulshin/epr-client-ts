import { useState, useCallback, useEffect, FC, SetStateAction } from 'react'

enum localStore {
    userId = 'storageUserId'
}

export const useAuth = () => {
   // const [token, setToken] = useState(null)
    const [ready, setReady] = useState<boolean>(false)
    const [userId, setUserId] = useState<number | null>(null)

    const login = useCallback((id: number) => {
       // setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(localStore.userId, JSON.stringify({
            userId: id, 
            //token: jwtToken
        }))
    }, [])
    const logout = useCallback(() => {
        setUserId(null)
        localStorage.removeItem(localStore.userId)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStore.userId) || '{}' )

        if(data && data.token) {
            login(data.userId)
        }
        setReady(true)

    }, [login])

    return { login, logout, userId, ready }
}

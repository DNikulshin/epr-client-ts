import { useCallback } from 'react'

export const useMessage = () => {
    return useCallback((text: string = '') => text ? text : null
        , [])
}

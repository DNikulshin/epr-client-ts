
import {Navigate, Outlet} from 'react-router-dom'
import {useAuthStore} from '../store/auth-store/auth-store.ts'

export const PrivateRoutes = () => {
    const userId = useAuthStore(state => state.userId)
    return (
        userId ? <Outlet/> : <Navigate to='/login' replace/>
    )
}
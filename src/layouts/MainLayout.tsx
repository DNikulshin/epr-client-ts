import {Outlet} from 'react-router-dom'
import {Navigation} from "../components/Navigation.tsx";
import {useAuthStore} from "../store/auth-store/auth-store.ts";

export const MainLayout = () => {
    const logout = useAuthStore(state => state.logout)
    return <>
        {<Navigation logout={logout}/>}
        <main>
            <Outlet/>
        </main>
    </>
}
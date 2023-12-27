import {Navigate, Route, Routes} from 'react-router-dom'
import {ClaimsPage} from './pages/ClaimsPage'
import {AuthPage} from './pages/AuthPage'
import {UserPage} from './pages/UserPage'
import {MainLayout} from "./layouts/MainLayout.tsx"
import {EmptyLayout} from "./layouts/EmptyLayout.tsx";

export const useRoutes = (isAuth: boolean) => {

    if (localStorage.getItem('userId') || isAuth) {
        return (
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index
                           element={<ClaimsPage/>}
                    >
                    </Route>
                    <Route path="login"
                           element={<AuthPage/>}
                    >
                    </Route>
                    <Route path="user"
                           element={<UserPage/>}
                    >
                    </Route>
                    <Route path="*"
                           element={<Navigate to="/" replace/>}
                    >
                    </Route>
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<EmptyLayout/>}>
                <Route path="login"
                       element={<AuthPage/>}
                >
                </Route>
                <Route path="*"
                       element={<Navigate to="login" replace/>}
                >
                </Route>
            </Route>
        </Routes>
    )

}
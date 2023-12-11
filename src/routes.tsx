import { Navigate, Route, Routes } from 'react-router-dom'
import { ClaimsPage } from './pages/ClaimsPage'
import { AuthPage } from './pages/AuthPage'
import { AllClaimsPage } from './pages/AllClaimsPage'
import { MapPage } from './pages/MapPage'
import { DetailPage } from './pages/DetailPage'

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/"
                       element={<ClaimsPage/>}
                >
                </Route>
                <Route path="/login"
                       element={<AuthPage/>}
                >
                </Route>
                <Route path="/all"
                       element={<AllClaimsPage/>}
                >
                </Route>
                <Route path="/coordinates/:id"
                       element={<MapPage/>}
                >
                </Route>
                <Route path="/detail/:id"
                       element={<DetailPage/>}
                >
                </Route>
                <Route path="*"
                       element={<Navigate to="/" replace/>}
                >
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/"
                   element={<AuthPage/>}
            >
            </Route>
            <Route path="*"
                   element={<Navigate to="/" replace/>}
            >
            </Route>
        </Routes>
    )

}

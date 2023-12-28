import {Navigate, Route, Routes} from 'react-router-dom'
import {ClaimsPage} from '../pages/ClaimsPage.tsx'
import {AuthPage} from '../pages/AuthPage.tsx'
import {UserPage} from '../pages/UserPage.tsx'
import {PrivateRoutes, PrivateRoutesProps} from "./PivateRoutes.tsx";
import {MainLayout} from "../layouts/MainLayout.tsx";
export const useRoutes = ({userId}: PrivateRoutesProps) => {
    return (
        <Routes>
            <Route element={<PrivateRoutes userId={userId}/>}>
                <Route element={<MainLayout/>}>
                    <Route path='/' index
                           element={<ClaimsPage/>}
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
            </Route>
            {<Route path="/login"
                    element={<AuthPage/>}
            >
                <Route path="*"
                       element={<Navigate to="/" replace/>}
                >
                </Route>
            </Route>}
        </Routes>
    )
}


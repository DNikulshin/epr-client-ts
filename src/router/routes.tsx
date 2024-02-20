import {Navigate, Route, Routes} from 'react-router-dom'
import Test from '../components/Test.tsx';
import {ClaimsPage} from '../pages/ClaimsPage.tsx'
import {AuthPage} from '../pages/AuthPage.tsx'
import {UserPage} from '../pages/UserPage.tsx'
import {PrivateRoutes} from "./PivateRoutes.tsx";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {InfoPage} from "../pages/InfoPage.tsx";
export const useRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path='/' element={<MainLayout/>}>
                    <Route index
                           element={<ClaimsPage/>}
                    >
                    </Route>

                    <Route path="user"
                           element={<UserPage/>}
                    >
                    </Route>
                    <Route path="info"
                           element={<InfoPage/>}
                    >
                    </Route>
                  <Route path="upload/*"
                       element={<Test/>}
                  >
                  </Route>
                    <Route path="*"
                           element={<Navigate to="/" replace/>}
                    >
                    </Route>
                </Route>
            </Route>
            <Route path="/login"
                    element={<AuthPage/>}
            >
                <Route path="*"
                       element={<Navigate to="/login" replace/>}
                >
                </Route>
            </Route>
        </Routes>
    )
}


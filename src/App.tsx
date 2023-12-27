import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {ToastContainer} from 'react-toastify'
import {useAuthStore} from './store/auth-store/auth-store.ts'
import {Loader} from "./components/Loader.tsx"
export default function App() {
    const isAuth = useAuthStore(state => state.isAuth)
    const loading = useAuthStore(state => state.loading)
    const routes = useRoutes(isAuth)

    if (loading) {
        return <Loader/>
    }

    return (
        <Router>
            <div className="container">
                <small className="version-app" style={{
                    fontSize: '.65rem',
                    position: 'absolute',
                    top: '0.5rem',
                    left: '0.5rem'
                }}>v_0.1</small>
                    {routes}
                <ToastContainer position='top-center'/>
            </div>
        </Router>
    )
}

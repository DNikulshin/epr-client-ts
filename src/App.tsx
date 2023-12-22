import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {ToastContainer} from 'react-toastify'
import {useAuthStore} from './store/auth-store'
import {Loader} from "./components/Loader.tsx"
import {Navigation} from "./components/Navigation.tsx";
import {useDataStore} from "./store/data-store/data-store.ts";
export default function App() {
    const isAuth = useAuthStore(state => state.isAuth)
    const UserId = useAuthStore(state => state.userId)
    const loading = useAuthStore(state => state.loading)
    const logout = useAuthStore(state => state.logout)
    const getItems = useDataStore(state => state.getItems)
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
                {UserId && <Navigation onClick={getItems} buttonTypeText='Все заявки' linkTo='/all' currentRoute='/' logout={logout}/>}
                <main>
                    {routes}
                </main>
                <ToastContainer position='top-center'/>
            </div>
        </Router>
    )
}

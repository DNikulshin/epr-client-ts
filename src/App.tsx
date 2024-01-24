import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './router/routes.tsx'
import {ToastContainer, toast} from 'react-toastify'
import {useAuthStore} from './store/auth-store/auth-store.ts'
import {Loader} from "./components/Loader.tsx"
import {useNavigatorOnline} from './hooks/useNavigatorOnline.tsx'
import noInternet from './assets/images/no-intetnet.jpg'

export default function App() {
    const loading = useAuthStore(state => state.loading)
    const routes = useRoutes()
    const {isOffline} = useNavigatorOnline()

    if (isOffline) {
        toast('Нет интернет соединения!')

        return (
            <div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column text-center">
                <ToastContainer position='top-center'/>
                <img src={noInternet} alt="No Internet" className="mb-5" style={{
                    maxWidth: '150px'
                }}/>
                <button onClick={() => window.location.reload()} className="btn btn-outline-primary">Обновить</button>
            </div>
            )
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Router>
        <small className="version-app" style={{
                    fontSize: '.65rem',
                    position: 'absolute',
                    top: '0.25rem',
                    left: '0.25rem'
                }}>v_0.1</small>
                {routes}
                <ToastContainer position='top-center'/>
        </Router>
    )
}

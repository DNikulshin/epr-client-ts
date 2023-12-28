import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './router/routes.tsx'
import {ToastContainer, toast} from 'react-toastify'
import {useAuthStore} from './store/auth-store/auth-store.ts'
import {Loader} from "./components/Loader.tsx"
import {useNavigatorOnline} from "./hooks/useNavigatorOnline.tsx"
import noInternet from './images/no-intetnet.jpg'

export default function App() {
    const userId = useAuthStore(state => state.userId)
    const loading = useAuthStore(state => state.loading)
    const routes = useRoutes({userId})
    const {isOffline} = useNavigatorOnline()

    if (isOffline) {
        toast('No Internet!')

        return (
            <div className="d-flex justify-content-center align-items-center w-100 vh-100 flex-column">
                <ToastContainer position='top-center'/>
                <img src={noInternet} alt="No Internet" className="mb-5" style={{
                    maxWidth: '150px'
                }}/>
                <button onClick={() => window.location.reload()} className="btn btn-outline-primary">Reboot</button>
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
                    top: '0.5rem',
                    left: '0.5rem'
                }}>v_0.1</small>
                {routes}
                <ToastContainer position='top-center'/>
        </Router>
    )
}

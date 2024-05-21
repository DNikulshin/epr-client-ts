import { BrowserRouter as Router } from 'react-router-dom'
import { OfflineFeedback } from './components/OfflineFeedback.tsx';
import { useRoutes } from './router/routes.tsx'
import { ToastContainer } from 'react-toastify'
import { useAuthStore } from './store/auth-store/auth-store.ts'
import { Loader } from './components/Loader.tsx'
import { useNavigatorOnline } from './hooks/useNavigatorOnline.tsx'

export default function App() {
  const loading = useAuthStore(state => state.loading)
  const routes = useRoutes()
  const { isOffline } = useNavigatorOnline()

  if (isOffline) return <OfflineFeedback />
  if (loading) return <Loader />

  return (
    <Router>
      <small
        className="version-app"
      >
        v_0.4
      </small>
      {routes}
      <ToastContainer
        position="top-center"
      />
    </Router>
  )
}

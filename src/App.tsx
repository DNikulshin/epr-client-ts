import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import {useAuthStore} from './store/auth-store'


export default function App() {
    const isAuth  = useAuthStore(state => state.isAuth)
    const checkAuth  = useAuthStore(state => state.checkAuth)
  const routes = useRoutes(isAuth)

  useEffect( () => {
    checkAuth('ndu', '111')
  }, [isAuth])

//   if (!ready) {
//       return <Loader/>
//   }

  return (
      <Router>
        <div className="container position-relative">
            <small className="version-app">v2</small>
                {routes}
         <ToastContainer position='top-center'/>
        </div>
      </Router>
)
}

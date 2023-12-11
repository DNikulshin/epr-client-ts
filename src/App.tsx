import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import { ToastContainer } from 'react-toastify'


export default function App() {
  const {login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!1
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
      return <Loader/>
  }

  return (
      <AuthContext.Provider value={{
          login, logout, userId, isAuthenticated
      }}>
      <Router>
        <div className="container position-relative">
            <small className="version-app">v2</small>
                {routes}
         <ToastContainer position='top-center'/>
        </div>
      </Router>
      </AuthContext.Provider>
)
}

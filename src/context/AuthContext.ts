import {createContext} from 'react'

// interface contextProps {
//     userId: number | null
//     noop: () => void
//     login: (fn) => fn<void>
//     logout: () => 
//     isAuthenticated: boolean
  
// }
function noop () {}

export const AuthContext = createContext({
   // token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: true
})

import {useState} from 'react'

import 'react-toastify/dist/ReactToastify.css'
import {useAuthStore} from "../store/auth-store/auth-store.ts"
import {useNavigate} from 'react-router-dom'

export const AuthPage = () => {
    const checkAuth = useAuthStore(store => store.checkAuth)
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    //const userId = useAuthStore(state => state.userId)
    const navigate = useNavigate()
    const loginHandler =  () => {
        if (!login && !password) return
        checkAuth(login, password).then((isAuth) => {
            if (isAuth) {
                navigate('/')
            }
        })

    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
            <div className=" d-flex flex-column auth">
                <div className="auth-content d-flex flex-column">
                    <h3 className="mb-3">Авторизация в hd-erp</h3>
                    <form className="d-flex flex-column">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control input-shadow"
                                name="login"
                                aria-describedby="loginHelp"
                                placeholder="Введите логин"
                                onChange={(e) => setLogin(e.target.value)}
                                value={login}
                                autoComplete="on"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control input-shadow"
                                name="password"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete="on"
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary mb-3 btn-shadow"
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        {/* <button
                            type="submit"
                            className="btn btn-success btn-shadow"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button> */}
                    </form>
                </div>

            </div>

        </div>
    )
}


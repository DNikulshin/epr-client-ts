import { useEffect, useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading,  request, error, clearError } = useHttp()
    const [form, setForm] = useState<string>({ login: '', password: '' })

    useEffect(() =>{
        if(error) {
            toast(error.toString())
            clearError()
        }
    }, [error, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
           const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}

    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            localStorage.setItem('storageBody', JSON.stringify({login:form.login, stringData: window.btoa(form.password)}))
            message(data.message)
        } catch (e) {
        }
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
            <div className=" d-flex flex-column auth">
                <div className="auth-content d-flex flex-column">
                    <h3 className="mb-3">Авторизация в hd-erp</h3>
                    <div className="d-flex flex-column">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control input-shadow"
                                name="login"
                                aria-describedby="loginHelp"
                                placeholder="Введите логин"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control input-shadow"
                                name="password"
                                placeholder="Введите пароль"
                                onChange={changeHandler}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
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
                    </div>
                </div>

            </div>

        </div>
    )
}


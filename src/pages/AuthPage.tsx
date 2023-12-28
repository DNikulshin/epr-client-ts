import {ChangeEventHandler, FormEventHandler, useState} from 'react'

import 'react-toastify/dist/ReactToastify.css'
import {useAuthStore} from "../store/auth-store/auth-store.ts"
import {useNavigate} from "react-router-dom"
import {IformData} from "../store/auth-store/auth-store.ts";

export const AuthPage = () => {
    const checkAuth = useAuthStore(store => store.checkAuth)
    const [formValue, setFormValue] = useState<IformData>({login: '', pass: ''})

    //const userId = useAuthStore(state => state.userId)
    const navigate = useNavigate()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const loginFormData = new FormData()
        loginFormData.append("username", formValue.login)
        loginFormData.append("password", formValue.pass)
        if (!formValue.login && !formValue.pass) return
        await checkAuth(formValue)
            .then((data) => {
                if (data) {
                    navigate('/')
                }
            })
    }

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
            <div className=" d-flex flex-column auth">
                <div className="auth-content d-flex flex-column">
                    <h3 className="mb-3">Авторизация в hd-erp</h3>
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control input-shadow"
                                name="login"
                                aria-describedby="loginHelp"
                                placeholder="Введите логин"
                                onChange={changeHandler}
                                value={formValue.login}
                                autoComplete="on"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control input-shadow"
                                name="pass"
                                placeholder="Введите пароль"
                                onChange={changeHandler}
                                value={formValue.pass}
                                autoComplete="on"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mb-3 btn-shadow"
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


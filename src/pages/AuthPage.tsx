import { ChangeEventHandler, FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../store/auth-store/auth-store.ts';
import { IformData } from '../store/auth-store/auth-store.ts';


export const AuthPage = () => {
  const navigate = useNavigate();
  const checkAuth = useAuthStore(store => store.checkAuth);
  const [formValue, setFormValue] = useState<IformData>({ login: '', pass: '' });

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    const loginFormData = new FormData();
    if (!formValue.login || !formValue.pass) return;
    loginFormData.append('username', formValue.login.trim());
    loginFormData.append('password', formValue.pass.trim());

    const data = await checkAuth(formValue);
    if (data) {
      navigate('/')
      window.location.reload()
    }


  }, [checkAuth, formValue, navigate]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });

  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
      <div className=" d-flex flex-column auth">
        <div className="auth-content d-flex flex-column">
          <h3 className="mb-3 text-center">ERP-HelpDesk</h3>
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
          </form>
        </div>

      </div>

    </div>
  );
};


import { useState } from 'react';
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChang(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }

    return (
        <div className='auth'>
            <form
                className='auth__form'
                name='register'
                onSubmit={handleSubmit}
            >
                <h2 className='auth__title'>Регистрация</h2>
                <input
                    name="register-email"
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={handleEmailChang}
                />
                <input
                    name="register-password"
                    className="auth__input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    minLength={8}
                    maxLength={50}
                    required
                    onChange={handlePasswordChange}
                />
                <button
                    type="submit"
                    className="auth__button"
                >
                    Зарегистрироваться
                </button>
                <Link
                    to="/sign-in"
                    className="auth__link"
                >
                    Уже зарегистрированы? Войти
                </Link>
            </form>
        </div>
    );
}

export default Register;
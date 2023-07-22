import React from 'react';

function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChang(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <div className='auth'>
            <form
                className='auth__form'
                name='login'
                onSubmit={handleSubmit}
            >
                <h2 className='auth__title'>Вход</h2>
                <input
                    name="login-email"
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChang}
                />
                <input
                    name="login-password"
                    className="auth__input"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button
                    type="submit"
                    className="auth__button"
                >Войти
                </button>
            </form>
        </div>
    )
}

export default Login;
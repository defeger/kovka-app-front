import React from 'react'
import { Link } from 'react-router-dom'
import '../Login.css';
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Login = () => {
    const { loginUser } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const token = await loginUser(email, password);
            // Сохраняем токен в localStorage
            localStorage.setItem('authToken', token);
            await Swal.fire({
                icon: 'success',
                title: 'Успешный вход!',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.href = "/";
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Пожалуйста, введите корректный email и пароль'
            });
            console.error(error);
        }
    }

    return (
        <div className="auth-con">
            <div className="auth-container">
                <Link className="back-btn" to="/">← На главную</Link>
                <div className="logo">Кузница "Гранит"</div>
                <h2>Вход в личный кабинет</h2>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Пароль" required />
                    <button
                        type="submit"
                        className="btn"
                    >
                        Войти
                    </button>
                </form>
                <div className="links">
                    <Link to="/reg">Регистрация</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
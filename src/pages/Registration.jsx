import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { IMaskInput } from 'react-imask';
import Swal from 'sweetalert2'

const Register = () => {
    const [message, setMessage] = useState("");
    const { registerUser, signInWithGoogle, registerWithPhone, logout } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const [phoneStep, setPhoneStep] = useState(1);
    const [confirmationResult, setConfirmationResult] = useState(null);

    // обычная регистрация
    const onSubmit = async (data) => {
        try {
            await registerUser(data.name, data.email, data.password);
            await logout();
            await Swal.fire({
                icon: 'success',
                title: 'Регистрация успешна!',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => navigate("/login"), 100); // небольшая задержка
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Пожалуйста, введите корректный email и пароль'
            });
            setMessage("Пожалуйста, укажите действительный адрес электронной почты и пароль");
            console.error(error);
        }
    }

    return (
        <div className="auth-con">
            <div className="auth-container">
                <Link className="back-btn" to="/">← На главную</Link>
                <div className="logo">Кузница "Гранит"</div>
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Имя" {...register("name", { required: true })} />
                    <input type="email" placeholder="Email" {...register("email", { required: true })} />
                    <input type="password" placeholder="Пароль" {...register("password", { required: true })} />
                    <input type="password" placeholder="Подтвердите пароль" {...register("confirmPassword", { required: true })} />
                    <button
                      type="submit"
                      className="btn"
                    >
                      Зарегистрироваться
                    </button>
                </form>
                {message && <div style={{color: 'red'}}>{message}</div>}
                <div className="links">
                    <Link to="/login">Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
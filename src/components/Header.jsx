import { Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import metalica from "../media/metalica.png"
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../media/metalica.png"

function Header() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            alert("Ошибка при выходе");
            console.error(error);
        }
    };

    const handleBurgerClick = () => {
        setMenuOpen(prev => !prev);
    };

    // Закрывать меню при переходе по ссылке
    const handleNavLinkClick = () => {
        setMenuOpen(false);
    };

    return (
    <>
        <header className="header" id="head">
        <div className="container">
            <div className="header-inner">
                <div className="logo">
                    <img src={metalica} alt="" />
                    <Link to="/"><h1 className="Head-h1">Стальная Вязь</h1></Link>
                </div>
                
                <div className="nav">
                    <ul className={`nav-list${menuOpen ? " active" : ""}`}>
                        <li><HashLink smooth to="/#works" onClick={handleNavLinkClick}>Работы</HashLink></li>
                        <li><HashLink smooth to="/#contacts" onClick={handleNavLinkClick}>Контакты</HashLink></li>
                        {!currentUser && <li><Link to="/login" onClick={handleNavLinkClick}>Логин</Link></li>}
                        {!currentUser && <li><Link to="/reg" onClick={handleNavLinkClick}>Регистрация</Link></li>}
                        {currentUser && (
                          <li>
                            <button
                              onClick={() => {handleLogout(); handleNavLinkClick();}}
                              className="nav-link-btn"
                              style={{
                                background: "none",
                                border: "none",
                                color: "white",
                                cursor: "pointer",
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                fontSize: "1rem",
                                padding: "0",
                                transition: "color 0.3s"
                              }}
                              onMouseOver={e => e.currentTarget.style.color = "#8B4513"}
                              onMouseOut={e => e.currentTarget.style.color = "white"}
                            >
                              Выйти
                            </button>
                          </li>
                        )}
                        <li><p className="telephone">+7(999)-999-99-99</p></li>
                    </ul>
                    <div className={`burger${menuOpen ? " active" : ""}`} onClick={handleBurgerClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
)
}
export default Header;
import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import kakulka from "../media/kakulka.png"

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={kakulka} alt="" />
                    <h3>Стальная Вязь</h3>
                </div>
                <div className="footer-links">
                        <ul>
                            <li><HashLink smooth to="/#head">Главная</HashLink></li>
                        </ul>
                        <ul>
                            <li><HashLink smooth to="/#works">Работы</HashLink></li>
                        </ul>
                        <ul>
                            <li><HashLink smooth to="/#contacts">Контакты</HashLink></li>
                        </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 "Стальная Вязь". Все права защищены.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
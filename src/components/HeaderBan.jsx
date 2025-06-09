import React from 'react'
import { HashLink } from 'react-router-hash-link';

const HeaderBan = () => {
  return (
    <section className="main-section" id="main">
        <div className="container">
            <div className="main-content">
                <h2>Искусство ковки в каждой детали</h2>
                <p>Создаем уникальные кованые изделия по индивидуальным проектам</p>
                <HashLink className="btn btn-metal" smooth to="/#contacts">Обсудить проект</HashLink>
            </div>
            <div className="scroll-down">
                <i className="fas fa-chevron-down"></i>
            </div>
        </div>
    </section>
  )
}

export default HeaderBan;
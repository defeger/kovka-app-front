import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const Works = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://kovka-app-back.onrender.com')
            .then(res => {
                // Для отладки: вывести заголовки и статус
                console.log('Ответ сервера:', res);
                if (!res.ok) throw new Error('Ошибка загрузки: ' + res.status);
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Сервер вернул не JSON");
                }
                return res.json();
            })
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredItems = filter === "all"
        ? items
        : items.filter(item => item.category === filter);

    return (
        <section className="works-section" id="works">
            <div className="container">
                <h2 className="section-title">Наши работы</h2>
                <div className="works-filter">
                    <button
                        className={`filter-btn${filter === "all" ? " active" : ""}`}
                        onClick={() => setFilter("all")}
                    >Все</button>
                    <button
                        className={`filter-btn${filter === "gates" ? " active" : ""}`}
                        onClick={() => setFilter("gates")}
                    >Ворота</button>
                    <button
                        className={`filter-btn${filter === "furniture" ? " active" : ""}`}
                        onClick={() => setFilter("furniture")}
                    >Мебель</button>
                    <button
                        className={`filter-btn${filter === "decor" ? " active" : ""}`}
                        onClick={() => setFilter("decor")}
                    >Декор</button>
                </div>
                {loading && <div>Загрузка...</div>}
                {error && <div style={{color: 'red'}}>Ошибка: {error}</div>}
                <div className="works-grid">
                    {!loading && !error && filteredItems.map((item) => {
                        // Если img — это абсолютная ссылка, используем её напрямую
                        const imgSrc = item.img.startsWith('http') ? item.img : `/media/${item.img}`;
                        return (
                        <div className="work-card" data-category={item.category} key={item._id}>
                            <img src={imgSrc} alt={item.alt}/>
                            <div className="work-overlay">
                                <h3>{item.title}</h3>
                                <Link
                                  className="btn btn-outline"
                                  to={`/desc/${item._id}`}
                                >
                                  Подробнее
                                </Link>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    )
}

export default Works

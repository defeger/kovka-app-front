import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Description = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем все товары, затем ищем нужный по id
    fetch('https://kovka-app-back.onrender.com/api/items')
      .then(res => res.json())
      .then(data => {
        // Найти товар по _id
        const found = data.find(item => item._id === id);
        setProduct(found);
        setCurrent(0); // сбросить слайдер при смене товара
      })
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <div>Загрузка...</div>;

  // Массив картинок: если есть product.images, иначе [product.img]
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.img];

  const showPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const imgSrc = images[current].startsWith('http') ? images[current] : `/media/${images[current]}`;

  // Функция для перехода на главную и скролла к контактам
  const goToContacts = (e) => {
    e.preventDefault();
    window.location.assign('/#contacts');
  };

  return (
    <div style={{maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24, position: 'relative'}}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          backgroundImage: 'linear-gradient(147deg, #e34234 0%,rgb(189, 94, 30) 74%)',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '10px 16px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 0,
          zIndex: 2
        }}
      >
        ← На главную
      </button>
      <div style={{paddingTop: 48}}>
        {/* Слайдер */}
        <div style={{position: 'relative', marginBottom: 24, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img
            src={imgSrc}
            alt={product.alt || product.title}
            style={{
              width: '100%',
              maxWidth: 500,
              height: '350px',
              objectFit: 'cover',
              borderRadius: 8,
              display: 'block',
              margin: '0 auto',
              cursor: 'pointer'
            }}
            onClick={() => setModalOpen(true)}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={showPrev}
                style={{
                  position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)',
                  background: '#0008', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer'
                }}
                aria-label="Назад"
              >‹</button>
              <button
                onClick={showNext}
                style={{
                  position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)',
                  background: '#0008', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer'
                }}
                aria-label="Вперед"
              >›</button>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 10,
                  transform: 'translateX(-50%)',
                  background: 'rgba(255,255,255,0.85)',
                  color: '#888',
                  fontSize: 14,
                  padding: '2px 12px',
                  borderRadius: 12,
                  boxShadow: '0 1px 4px #0002'
                }}
              >
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        {/* Модальное окно для полноразмерного изображения */}
        {modalOpen && (
          <div
            onClick={() => setModalOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={imgSrc}
              alt={product.alt || product.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                boxShadow: '0 4px 32px #000a',
                background: '#fff'
              }}
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
        <h2 style={{marginBottom: 16}}>{product.title}</h2>
        <p style={{marginBottom: 24}}>{product.description || product.alt || 'Описание отсутствует.'}</p>
        <button
          className="btn btn-metal"
          onClick={() => window.location.href = '/cont'}
        >
          Обсудить проект
        </button>
      </div>
    </div>
  );
};

export default Description;

import React from 'react'
import { Link } from 'react-router-dom'
import { IMaskInput } from 'react-imask'
import Swal from 'sweetalert2'

const Contacts = () => {
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nameValue = form[0].value;
    const phoneValue = form[1].value;
    // Проверка имени: только буквы, пробелы, дефисы
    const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!namePattern.test(nameValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: 'Имя должно содержать только буквы'
      });
      return;
    }
    // Проверка телефона: +7 (999) 999-99-99
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phoneValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: 'Введите корректный телефон в формате +7 (999) 999-99-99'
      });
      return;
    }
    const order = {
      name: nameValue,
      phone: phoneValue,
      type: form[2].value,
      description: form[3].value,
      createdAt: new Date()
    };
    try {
      // Изменено: отправка на /api/orders
      const res = await fetch('https://kovka-app-back.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error('Ошибка при отправке');
      Swal.fire({
        icon: 'success',
        title: 'Заявка отправлена!',
        showConfirmButton: false,
        timer: 1500
      });
      form.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка при отправке заявки',
        text: error.message
      });
      console.error(error);
    }
  };

  return (
    <section className='contacts-section' id="contacts">
        <div className="container">
            <h2 className='section-title' >контакты</h2>
            <div className="contacts-wrapper">
                <div className="contacts-info">
                    <h3>Наши реквизиты</h3>
                    <div className="contact-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>г. Москва, ул. Кузнечная, 15</p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <p>+7 (999) 123-45-67</p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <p>info@stalnayavyaz.ru</p>
                    </div>
                    <div className="contact-item">
                        <i className="fas fa-clock"></i>
                        <p>Пн-Пт: 9:00 - 18:00</p>
                    </div>
                    <div className="social-links">
                        <Link ></Link>
                        <Link ></Link>
                        <Link ></Link>
                        <Link ></Link>
                    </div>
                </div>
                <div className="contacts-form">
                    <form id='order-form' onSubmit={handleOrderSubmit}>
                        <h3>Оставить заявку</h3>
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          required
                          pattern="[A-Za-zА-Яа-яЁё\s-]+"
                          title="Только буквы"
                        />
                        <IMaskInput
                          mask="+7 (000) 000-00-00"
                          unmask={false}
                          placeholder="Телефон"
                          required
                          style={{width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '4px'}}
                        />
                        <select>
                            <option value="" >Тип изделия</option>
                            <option value="gates">Ворота/Ограждения</option>
                            <option value="furniture">Мебель</option>
                            <option value="decor">Декор</option>
                            <option value="other">Другое</option>
                        </select>
                        <textarea placeholder="Опишите ваш заказ"></textarea>
                        <button type="submit" className="btn btn-metal">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contacts
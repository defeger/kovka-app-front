import React, { useState } from 'react';

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');

  // Валидация имени: только буквы, пробелы, дефисы
  const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'name') {
      if (!value || namePattern.test(value)) {
        setNameError('');
      } else {
        setNameError('Имя должно содержать только буквы');
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSent(false);

    // Проверка имени перед отправкой
    if (!form.name || !namePattern.test(form.name)) {
      setNameError('Имя должно содержать только буквы');
      return;
    }
    setNameError('');
    setSending(true);
    try {
      const res = await fetch('https://kovka-app-back.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Ошибка отправки');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 2000,
          background: 'linear-gradient(147deg, #e34234 0%, rgb(189, 94, 30) 74%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          boxShadow: '0 4px 16px #0003',
          fontSize: 28,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Обратная связь"
        title="Обратная связь"
      >
        <span style={{fontSize: 28}}>💬</span>
      </button>
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 2001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 32,
              minWidth: 320,
              maxWidth: 90 + 'vw',
              boxShadow: '0 8px 32px #0003',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#888',
                cursor: 'pointer'
              }}
              aria-label="Закрыть"
            >×</button>
            <h3 style={{marginBottom: 16, color: '#8B4513'}}>Обратная связь</h3>
            {sent ? (
              <div style={{color: 'green', marginBottom: 12}}>Спасибо за ваше сообщение!</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-zА-Яа-яЁё\s-]+"
                  title="Только буквы"
                  style={{width: '100%', marginBottom: 10, padding: 10, borderRadius: 4, border: '1px solid #ddd'}}
                />
                {nameError && <div style={{color: 'red', marginBottom: 8}}>{nameError}</div>}
                <input
                  name="email"
                  type="email"
                  placeholder="Email (необязательно)"
                  value={form.email}
                  onChange={handleChange}
                  style={{width: '100%', marginBottom: 10, padding: 10, borderRadius: 4, border: '1px solid #ddd'}}
                />
                <textarea
                  name="message"
                  placeholder="Ваше сообщение"
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={{width: '100%', marginBottom: 10, padding: 10, borderRadius: 4, border: '1px solid #ddd', minHeight: 80}}
                />
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(147deg, #e34234 0%, rgb(189, 94, 30) 74%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: 12,
                    fontWeight: 700,
                    cursor: sending ? 'not-allowed' : 'pointer'
                  }}
                >
                  {sending ? 'Отправка...' : 'Отправить'}
                </button>
                {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;

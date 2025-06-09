import React, { useState } from 'react';

const AddItemForm = () => {
    const [form, setForm] = useState({ img: '', images: '', description: '', category: '', title: '', alt: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            ...form,
            images: form.images
                ? form.images.split(',').map(s => s.trim()).filter(Boolean)
                : []
        };
        const res = await fetch('http://localhost:5000/api/items/create-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) alert('Товар добавлен!');
        else alert('Ошибка!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="img" placeholder="URL картинки (основная)" value={form.img} onChange={handleChange} required />
            <input name="images" placeholder="URL картинок (через запятую)" value={form.images} onChange={handleChange} />
            <input name="description" placeholder="Описание" value={form.description} onChange={handleChange} required />
            <input name="category" placeholder="Категория" value={form.category} onChange={handleChange} required />
            <input name="title" placeholder="Название" value={form.title} onChange={handleChange} required />
            <input name="alt" placeholder="Alt текст" value={form.alt} onChange={handleChange} required />
            <button type="submit" className="btn">Добавить товар</button>
        </form>
    );
};

export default AddItemForm;

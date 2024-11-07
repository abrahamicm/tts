// src/components/EditLesson.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditLesson = () => {
    const { lessonId } = useParams(); // Obtener el id de la lección desde la URL
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        loadLesson();
    }, []);

    const loadLesson = () => {
        const lessons = JSON.parse(localStorage.getItem('lessons')) || [];
        const lesson = lessons.find((lesson) => lesson.id === lessonId);
        if (lesson) {
            setTitle(lesson.title);
            setContent(lesson.content);
        } else {
            alert("Lección no encontrada");
            navigate('/'); // Redirigir al inicio si la lección no existe
        }
    };

    const handleSave = () => {
        const lessons = JSON.parse(localStorage.getItem('lessons')) || [];
        const updatedLessons = lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, title, content } : lesson
        );

        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        alert('Lección actualizada con éxito');
        navigate('/'); // Redirigir al inicio después de guardar
    };

    return (
        <div className="container">
            <h1>Editar Lección</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la lección"
                className="form-control mb-2"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenido de la lección"
                className="form-control mb-2"
                style={{ minHeight: '150px' }}
            />
            <button onClick={handleSave} className="btn btn-primary">Guardar Cambios</button>
        </div>
    );
};

export default EditLesson;

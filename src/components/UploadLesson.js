// src/components/UploadLesson.js (suponiendo que este es el archivo donde se suben las lecciones)

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuid

const UploadLesson = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleUpload = () => {
        if (title && content) {
            const newLesson = {
                id: uuidv4(), // Genera un ID único
                title: title,
                content: content
            };

            // Cargar lecciones existentes
            const existingLessons = JSON.parse(localStorage.getItem('lessons')) || [];
            existingLessons.push(newLesson);

            // Guardar en localStorage
            localStorage.setItem('lessons', JSON.stringify(existingLessons));
            alert('Lección guardada con éxito');
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="container">
            <h1>Subir Nueva Lección</h1>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título de la lección"
                className="form-control mb-2"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Contenido de la lección"
                className="form-control mb-2"
                style={{ minHeight: '200px' }} 
            />
            <button onClick={handleUpload} className="btn btn-primary">Guardar Lección</button>
        </div>
    );
};

export default UploadLesson;

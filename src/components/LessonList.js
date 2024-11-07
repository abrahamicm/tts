// src/components/LessonList.js

import React, { useState, useEffect } from 'react';

const LessonList = () => {
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        loadLessons();
    }, []);

    const loadLessons = () => {
        const loadedLessons = JSON.parse(localStorage.getItem('lessons')) || [];
        setLessons(loadedLessons);
    };

    const handleDelete = (id) => {
        const updatedLessons = lessons.filter(lesson => lesson.id !== id);
        localStorage.setItem('lessons', JSON.stringify(updatedLessons));
        setLessons(updatedLessons);
    };

    return (
        <div className="container">
            <h1>Lecciones Guardadas</h1>
            <ul className="list-group">
                {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <li key={lesson.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{lesson.title}</strong>
                               
                            </div>
                            <div>
                                <span className="badge bg-secondary me-2">{lesson.id}</span>
                                <button
                                    onClick={() => handleDelete(lesson.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No hay lecciones guardadas.</li>
                )}
            </ul>
        </div>
    );
};

export default LessonList;

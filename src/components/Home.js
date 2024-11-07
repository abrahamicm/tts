// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [lessons, setLessons] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

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

    const filteredLessons = lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar las lecciones por el término de búsqueda
    );

    return (
        <div className="container">

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar lección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            {/* Listado de lecciones filtradas */}
            <ul className="list-group">
                {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson) => (
                        <li key={lesson.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <Link to={`/play/${lesson.id}`}>
                                    <strong>{lesson.title}</strong>
                                </Link>
                            </div>
                            <div>
                                <Link to={`/edit/${lesson.id}`} className="btn btn-warning btn-sm me-2">Editar</Link> {/* Enlace para editar */}
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
                    <li className="list-group-item">No hay lecciones que coincidan con la búsqueda.</li>
                )}
            </ul>
        </div>
    );
};

export default Home;

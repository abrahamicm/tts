// src/components/PlayLesson.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlayLesson = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        const lessons = JSON.parse(localStorage.getItem('lessons')) || [];
        const foundLesson = lessons.find((lesson) => lesson.id === lessonId);
        setLesson(foundLesson);

        return () => window.speechSynthesis.cancel(); // Detiene el TTS si el usuario abandona la página
    }, [lessonId]);

    // Función para dividir el contenido en líneas y reproducirlo con idiomas alternados
    const speakLessonInAlternatingLanguages = () => {
        if (lesson && 'speechSynthesis' in window) {
            const lines = lesson.content.split('\n');
            lines.forEach((line, index) => {
                const utterance = new SpeechSynthesisUtterance(line);
                utterance.lang = index % 2 === 0 ? 'es-ES' : 'en-US';
                utterance.rate = 1;
                window.speechSynthesis.speak(utterance);
            });
        } else {
            alert("Tu navegador no soporta TTS");
        }
    };

    if (!lesson) {
        return <div className="container"><p>Lección no encontrada.</p></div>;
    }

    // Divide el contenido en pares de líneas (español, inglés)
    const lines = lesson.content.split('\n');
    const pairedLines = [];
    for (let i = 0; i < lines.length; i += 2) {
        pairedLines.push({
            spanish: lines[i] || "",      // Línea en español
            english: lines[i + 1] || ""   // Línea en inglés
        });
    }

    return (
        <div className="container">
            <h1>{lesson.title}</h1>

            {/* Tabla de Bootstrap */}
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Español</th>
                        <th>Inglés</th>
                    </tr>
                </thead>
                <tbody>
                    {pairedLines.map((pair, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td> {/* Número de línea */}
                            <td>{pair.spanish}</td> {/* Contenido en español */}
                            <td>{pair.english}</td> {/* Contenido en inglés */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-secondary mt-3" onClick={speakLessonInAlternatingLanguages}>
                Reproducir en TTS
            </button>
        </div>
    );
};

export default PlayLesson;

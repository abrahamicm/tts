// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UploadLesson from './components/UploadLesson';
import PlayLesson from './components/PlayLesson';
import EditLesson from './components/EditLesson'; // Importar el componente de edición
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadLesson />} />
            <Route path="/play/:lessonId" element={<PlayLesson />} />
            <Route path="/edit/:lessonId" element={<EditLesson />} /> {/* Nueva ruta para edición */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

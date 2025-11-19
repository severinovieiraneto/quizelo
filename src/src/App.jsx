import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle'; // <-- Importe aqui
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col items-center selection:bg-brand-purple selection:text-white relative">
      
      {/* Botão de Tema */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      <Header />

      <main className="w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:categoryId" element={<QuizPage />} />
          <Route path="/resultados" element={<ResultPage />} />
        </Routes>
      </main>
      
      <footer className="mt-24 mb-8 text-center text-xs text-gray-500 opacity-60">
        <p>© 2025 Quizelo. Projeto Educacional.</p>
      </footer>

    </div>
  );
}

export default App;
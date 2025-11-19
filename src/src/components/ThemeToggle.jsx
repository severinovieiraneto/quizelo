import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Verifica o localStorage ao carregar
    const savedTheme = localStorage.getItem('quizelo-theme');
    // Se estiver salvo como light, aplica a classe
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('light');
      localStorage.setItem('quizelo-theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('quizelo-theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      // TRUQUE: Usamos 'bg-gray-800' e 'text-white' FIXOS.
      // Assim, o botão sempre será escuro com ícone claro, visível mesmo no fundo branco.
      className="p-3 rounded-full bg-gray-800 text-white border border-gray-600 hover:border-brand-purple transition-all shadow-lg hover:scale-110 active:scale-95 z-50 flex items-center justify-center"
      title={isLight ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}
      aria-label="Alternar Tema"
    >
      {isLight ? (
        // Lua (Voltar para o escuro)
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      ) : (
        // Sol (Ir para o claro)
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
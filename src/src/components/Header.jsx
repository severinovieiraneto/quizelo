import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="text-center my-8 md:my-12">
      <Link 
        to="/" 
        className="inline-block group hover:opacity-90 transition-opacity duration-300"
      >
        {/* MUDANÇA: text-white -> text-brand-text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text tracking-tight flex justify-center items-center gap-3">
          <span className="text-4xl md:text-5xl transform group-hover:rotate-12 transition-transform duration-500 cursor-default">
            💡
          </span>
          Quizelo
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-brand-purple mt-2">
          O Labirinto do Saber. Desafie sua mente!
        </p>
      </Link>
    </header>
  );
}

export default Header;
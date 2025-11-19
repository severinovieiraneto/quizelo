import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ id, name, description, isFeatured = false }) {
  
  const bgClass = isFeatured
    ? "bg-gradient-to-br from-brand-purple/70 to-brand-purple/30 border-brand-purple" 
    : "bg-brand-card border-gray-700/50 hover:border-gray-500"; // Em light mode, border-gray fica sutil

  const shadowClass = isFeatured
    ? "shadow-2xl shadow-brand-purple/30" 
    : "shadow-md hover:shadow-xl";
    
  // MUDANÇA: Lógica de cor do texto
  // Se for destaque (roxo), forçamos branco. Se for normal, usa a cor do tema (preto no claro, branco no escuro)
  const titleColor = isFeatured ? "text-white" : "text-brand-text group-hover:text-brand-purple";
  const descColor = isFeatured ? "text-gray-100" : "text-brand-text-muted";

  return (
    <Link 
      to={`/quiz/${id.toLowerCase()}`}
      className={`group block p-6 rounded-2xl border 
                 transition-all duration-300 transform hover:-translate-y-1 
                 ${shadowClass} ${bgClass}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-bold transition-colors ${titleColor}`}>
          {name}
        </h3>
        <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${isFeatured ? 'text-white' : 'text-brand-purple'}`}>
          ➜
        </span>
      </div>
      
      <p className={`text-sm leading-relaxed ${descColor}`}>
        {description}
      </p>
    </Link>
  );
}

export default CategoryCard;
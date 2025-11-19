import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Trilho da barra: Cinza claro no modo Light, Cinza escuro no modo Dark */}
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-300 dark:border-gray-700">
        
        {/* Preenchimento: Roxo da marca (funciona em ambos) */}
        <div 
          className="bg-brand-purple h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {/* Texto contador: Cor dinâmica */}
      <div className="text-right mt-2 text-xs font-mono font-medium text-brand-text-muted">
        {current} / {total}
      </div>
    </div>
  );
}

export default ProgressBar;
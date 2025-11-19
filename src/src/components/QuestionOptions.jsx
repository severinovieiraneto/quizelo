import React, { useState } from 'react';
import { DIFFICULTY_LEVELS } from '../constants/levels';

function QuestionOptions({ question, onAnswerSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const levelInfo = DIFFICULTY_LEVELS[question.level] || { label: 'Geral' };

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setTimeout(() => {
      onAnswerSelect(question, option);
      setIsAnswered(false);
      setSelectedOption(null);
    }, 1500);
  };

  const getButtonStyles = (option) => {
    // Base: Layout e borda
    const base = "w-full p-4 rounded-lg border-2 transition-all duration-200 font-medium text-left flex justify-between items-center shadow-sm ";
    
    if (!isAnswered) {
      // ESTADO NORMAL (Não respondido)
      return base + 
        // Light: Branco com texto quase preto
        "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-brand-purple/50 hover:shadow-md " +
        // Dark: Cinza escuro com texto claro
        "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-500";
    }

    // --- ESTADO DE FEEDBACK (AQUI ESTÁ A CORREÇÃO) ---
    
    if (option.isCorrect) {
      // CORRETO (VERDE)
      return base + 
        // Light: Fundo verde claro, mas TEXTO VERDE ESCURO (quase preto) para leitura
        "bg-green-100 border-green-600 text-green-900 font-bold " +
        // Dark: Mantém o padrão anterior (fundo escuro, texto claro)
        "dark:bg-green-900/40 dark:text-green-100 dark:border-green-500";
    }
    
    if (selectedOption === option && !option.isCorrect) {
      // ERRADO (VERMELHO)
      return base + 
        // Light: Fundo vermelho claro, TEXTO VERMELHO ESCURO
        "bg-red-100 border-red-600 text-red-900 font-bold " +
        // Dark: Fundo escuro, texto claro
        "dark:bg-red-900/40 dark:text-red-100 dark:border-red-500";
    }

    // OUTRAS OPÇÕES (APAGADAS)
    return base + 
      // Light: Texto cinza médio
      "bg-white border-transparent text-gray-400 opacity-50 " +
      // Dark: Texto cinza escuro
      "dark:bg-gray-900 dark:text-gray-600 dark:border-transparent cursor-not-allowed";
  };

  return (
    <div className="w-full">
      
      {/* CARTÃO DA PERGUNTA */}
      <div className="p-6 md:p-8 rounded-2xl shadow-xl transition-colors duration-300 
                      bg-white border border-gray-200
                      dark:bg-brand-card dark:border-brand-purple/20">
        
        <div className="flex justify-between items-center mb-6 text-xs font-bold tracking-wider uppercase">
          <span className="text-white bg-brand-purple px-3 py-1 rounded-full shadow-sm">
            {question.category}
          </span>
          <span className="text-brand-purple dark:text-yellow-400">
            Nível: {levelInfo.label}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-8 leading-snug text-gray-900 dark:text-brand-text">
          {question.question}
        </h2>

        <div className="flex flex-col space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={getButtonStyles(option)}
            >
              <span>{option.description}</span>
              {/* Ícones de Feedback */}
              {isAnswered && option.isCorrect && <span className="text-xl">✓</span>}
              {isAnswered && selectedOption === option && !option.isCorrect && <span className="text-xl">✕</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionOptions;
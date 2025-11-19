import React, { useState } from 'react';
import { DIFFICULTY_LEVELS } from '../constants/levels';

function QuestionOptions({ question, onAnswerSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const levelInfo = DIFFICULTY_LEVELS[question.level] || { label: 'Geral' };

  const handleOptionClick = (option) => {
    if (isAnswered) return; // Trava de segurança

    setSelectedOption(option);
    setIsAnswered(true); // Trava visual (pointer-events-none e opacidade)

    // AQUI ESTÁ A CORREÇÃO:
    setTimeout(() => {
      // Apenas avisamos o pai que acabou.
      onAnswerSelect(question, option);
      
      // REMOVIDO: setIsAnswered(false);
      // REMOVIDO: setSelectedOption(null);
      
      // Por que? Porque o componente pai (QuizPage) vai mudar a 'key' deste componente.
      // Isso força o React a destruir esta instância (que fica travada até morrer)
      // e montar uma nova instância fresca para a próxima pergunta.
    }, 1500);
  };

  const getButtonStyles = (option) => {
    const base = "w-full p-4 rounded-lg border-2 transition-all duration-200 font-medium text-left flex justify-between items-center shadow-sm ";
    
    if (!isAnswered) {
      return base + 
        "bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:border-brand-purple/50 hover:shadow-md cursor-pointer " +
        "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-500";
    }

    // --- ESTADO TRAVADO ---
    
    if (option.isCorrect) {
      return base + 
        "bg-green-100 border-green-600 text-green-900 font-bold " +
        "dark:bg-green-900/40 dark:text-green-100 dark:border-green-500";
    }
    
    if (selectedOption === option && !option.isCorrect) {
      return base + 
        "bg-red-100 border-red-600 text-red-900 font-bold " +
        "dark:bg-red-900/40 dark:text-red-100 dark:border-red-500";
    }

    return base + 
      "bg-white border-transparent text-gray-400 opacity-40 " +
      "dark:bg-gray-900 dark:text-gray-600 dark:border-transparent cursor-not-allowed";
  };

  return (
    <div className="w-full">
      <div className="bg-brand-card p-6 md:p-8 rounded-2xl shadow-xl transition-colors duration-300 
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

        {/* Mantemos o pointer-events-none para garantir que o clique físico seja impossível */}
        <div className={`flex flex-col space-y-3 ${isAnswered ? 'pointer-events-none' : ''}`}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={getButtonStyles(option)}
            >
              <span>{option.description}</span>
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
import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

function ResultPage() {
  const location = useLocation();
  
  if (!location.state || !location.state.results) {
    return <Navigate to="/" replace />;
  }

  const { results } = location.state;
  const totalCorrect = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  const resultsByCategory = results.reduce((acc, result) => {
    const category = result.category || "Geral";
    if (!acc[category]) {
      acc[category] = { correct: 0, total: 0 };
    }
    acc[category].total++;
    if (result.isCorrect) {
      acc[category].correct++;
    }
    return acc;
  }, {});

  const handleShare = async () => {
    let text = `💡 Resultado no Quizelo:\n`;
    text += `🏆 Desempenho: ${percentage}%\n`;
    text += `✅ Acertei ${totalCorrect} de ${totalQuestions}!\n\n`;
    
    text += `Destaques:\n`;
    Object.entries(resultsByCategory).forEach(([cat, stats]) => {
      const icon = stats.correct === stats.total ? '🥇' : '📝';
      text += `${icon} ${cat}: ${stats.correct}/${stats.total}\n`;
    });
    
    text += `\nJogue também em: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu resultado no Quizelo',
          text: text,
        });
      } catch (err) {
        // Ignora cancelamento
      }
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Resultado copiado para a área de transferência!");
      });
    }
  };

  const getFeedbackMessage = () => {
    if (percentage === 100) return "PERFEITO! Você dominou o Labirinto do Saber. Mestre!";
    if (percentage >= 80) return "Excelente resultado! Conhecimento de alto nível.";
    if (percentage >= 50) return "Bom trabalho! Você está no caminho certo.";
    return "Não desista! O aprendizado é uma jornada.";
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-10 px-4 animate-fade-in">
      
      {/* --- PLACAR GERAL --- */}
      <div className="bg-brand-card p-8 rounded-2xl shadow-2xl text-center mb-6 border border-brand-purple/30 mt-6 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-brand-text mb-2">Jornada Concluída!</h2>
        <p className="text-brand-text-muted mb-6 font-medium">{getFeedbackMessage()}</p>
        
        <div className="text-6xl md:text-7xl font-extrabold text-brand-purple mb-3">
          {percentage}%
        </div>
        <p className="text-xl text-brand-text-muted mb-8">
          Você acertou <span className="text-brand-text font-bold">{totalCorrect}</span> de {totalQuestions} perguntas
        </p>

        {/* --- BARRA DE AÇÕES (Jogar Novamente + Compartilhar) --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            
            {/* Botão Jogar Novamente (Destaque Principal) */}
            <Link 
                to="/" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full shadow-md transition-all transform hover:scale-105
                           bg-brand-purple hover:bg-violet-600 text-white font-bold"
            >
                <span className="text-lg">↺</span>
                Jogar Novamente
            </Link>

            {/* Botão Compartilhar (Secundário) */}
            <button 
                onClick={handleShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full shadow-md transition-all transform hover:scale-105
                           bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300
                           dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600 font-medium"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                </svg>
                Compartilhar
            </button>
        </div>
      </div>

      {/* --- RESUMO POR CATEGORIA (Lista Vertical de Largura Total) --- */}
      <div className="flex flex-col gap-3 mb-10">
        {Object.entries(resultsByCategory).map(([category, stats]) => (
          // Agora cada item ocupa 100% da largura (flex-col acima), alinhando com o card principal
          <div key={category} className="bg-brand-card p-4 rounded-xl flex justify-between items-center border border-gray-200 dark:border-gray-700 shadow-sm transition-colors px-6">
            <div className="flex items-center gap-3">
                {/* Ícone visual simples baseado no acerto total */}
                <span className="text-lg">{stats.correct === stats.total ? '🥇' : '📚'}</span>
                <span className="text-brand-text font-medium text-lg">{category}</span>
            </div>
            
            <span className={`font-bold text-lg ${stats.correct === stats.total ? 'text-green-600 dark:text-green-400' : 'text-brand-purple'}`}>
              {stats.correct}/{stats.total}
            </span>
          </div>
        ))}
      </div>

      {/* --- GABARITO --- */}
      <h3 className="text-2xl font-bold text-brand-text mb-6 px-2 border-l-4 border-brand-purple pl-3">
        Gabarito e Fontes
      </h3>
      
      <div className="space-y-6">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-xl shadow-md border transition-all bg-brand-card ${
              result.isCorrect 
                ? 'border-green-500/30 bg-green-50 dark:bg-green-900/10' 
                : 'border-red-500/30 bg-red-50 dark:bg-red-900/10'
            }`}
          >
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-700/50">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                {result.category}
              </span>
              <span className={`text-sm font-bold flex items-center gap-2 ${result.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {result.isCorrect ? (
                  <><span>Correto</span> ✓</>
                ) : (
                  <><span>Incorreto</span> ✕</>
                )}
              </span>
            </div>
            
            <p className="text-brand-text text-lg font-medium mb-4 leading-relaxed">
              {result.questionText}
            </p>
            
            {!result.isCorrect && (
              <div className="mb-4 bg-white dark:bg-gray-900/50 p-3 rounded-lg text-sm border border-gray-100 dark:border-transparent">
                <p className="text-red-600 dark:text-red-300 mb-1">
                  <span className="font-bold opacity-70">Sua resposta:</span> {result.userAnswer}
                </p>
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  <span className="font-bold opacity-70 text-gray-600 dark:text-gray-400 font-normal">Correta:</span> {result.correctAnswer}
                </p>
              </div>
            )}

            <div className="mt-2 text-sm">
              <div className="mb-3 text-brand-text-muted">
                <span className="text-brand-purple font-bold block mb-1">Explicação:</span>
                {result.sourceExplanation}
              </div>
              
              <div className="text-xs text-gray-500 italic border-t border-gray-200 dark:border-gray-700/50 pt-2 mt-2">
                <span className="font-semibold not-italic">Fonte: </span> 
                {result.sourceAbnt}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
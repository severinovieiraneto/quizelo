import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuestionOptions from '../components/QuestionOptions';
import Loader from '../components/Loader';
import { getQuizData, QUIZ_SETTINGS } from '../utils/quizUtils';

const TOTAL_QUESTIONS = 10;

function QuizPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    getQuizData(categoryId)
        .then(data => {
            setQuizQuestions(data.slice(0, TOTAL_QUESTIONS));
            setLoading(false);
        })
        .catch(err => {
            console.error("Erro:", err);
            setError(`Erro ao carregar: ${err.message}`);
            setLoading(false);
        });
  }, [categoryId]);

  const handleExit = () => {
    const confirmExit = window.confirm("Tem certeza que deseja desistir? Todo o seu progresso atual será perdido.");
    if (confirmExit) {
        navigate('/');
    }
  };

  const handleAnswer = (question, selectedOption) => {
    const isCorrect = selectedOption.isCorrect === true;
    const correctAnswerObj = question.options.find(opt => opt.isCorrect) || question.options[0];

    const answerData = { 
        questionText: question.question,
        category: question.category,
        isCorrect: isCorrect,
        correctAnswer: correctAnswerObj.description,
        userAnswer: selectedOption.description,
        sourceExplanation: question.source_explanation,
        sourceAbnt: question.source_abnt
    };

    const updatedAnswers = [...userAnswers, answerData];
    setUserAnswers(updatedAnswers);

    if (updatedAnswers.length >= TOTAL_QUESTIONS) {
        setIsQuizFinished(true);
        setTimeout(() => {
            navigate('/resultados', { 
                state: { results: updatedAnswers },
                replace: true 
            });
        }, 1500);
    } else {
        setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
        }, 1000);
    }
  };

  if (loading) return <Loader />;
  
  if (error || quizQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-brand-error">Ops! Algo deu errado.</h2>
        <button onClick={() => navigate('/')} className="text-brand-purple underline">Voltar</button>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
            <Loader />
            <p className="mt-6 text-xl font-bold text-brand-purple">Calculando sua pontuação...</p>
        </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (!currentQuestion) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-6">
      
      <div className="w-full flex items-center gap-4 mb-14">
        
        {/* ATUALIZAÇÃO VISUAL DO BOTÃO: 
            1. bg-white (Fundo branco explícito no modo claro)
            2. text-gray-800 (Texto escuro forte no modo claro)
            3. border-gray-300 (Borda visível no modo claro)
            4. shadow-sm (Sombra leve para destacar do fundo)
            
            As classes 'dark:...' só ativam no modo escuro.
        */}
        <button 
            onClick={handleExit}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm border
                       bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:text-red-600 hover:border-red-300
                       dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:text-red-400 dark:hover:border-red-500/30"
            title="Voltar para o início"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Desistir
        </button>

        <div className="flex-1">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={TOTAL_QUESTIONS} 
            />
        </div>
      </div>
      
      <div className="w-full">
        <QuestionOptions 
            key={currentQuestion.id} 
            question={currentQuestion}
            onAnswerSelect={handleAnswer} 
        />
      </div>
    </div>
  );
}

export default QuizPage;
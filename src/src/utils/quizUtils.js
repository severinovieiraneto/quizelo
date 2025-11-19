// Local: src/utils/quizUtils.js

const TOTAL_QUESTIONS_PER_ROUND = 10;
// Pega a URL base configurada no vite.config.js (ex: "/quizelo/")
const BASE_URL = import.meta.env.BASE_URL;

function shuffleArray(array) {
  const newArray = [...array]; 
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function getQuizData(categoryId) {
  let questionsToSet = [];

  // CORREÇÃO NOS FETCHES ABAIXO: Adicionando BASE_URL

  if (categoryId === 'random') {
    // Busca categorias usando o caminho correto
    const catRes = await fetch(`${BASE_URL}data/categories.json`);
    const allCategories = await catRes.json();
    
    const randomCategories = shuffleArray([...allCategories]).slice(0, TOTAL_QUESTIONS_PER_ROUND);
    
    questionsToSet = await Promise.all(
      randomCategories.map(async (cat) => {
        // Busca perguntas usando o caminho correto
        const res = await fetch(`${BASE_URL}data/questions/${cat.id.toLowerCase()}.json`);
        const data = await res.json();
        return data[Math.floor(Math.random() * data.length)];
      })
    );
    
  } else {
    // Busca arquivo específico usando o caminho correto
    const res = await fetch(`${BASE_URL}data/questions/${categoryId.toLowerCase()}.json`);
    
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Falha ao carregar arquivo. Status: ${res.status}`);
    }
    
    const allQuestions = await res.json();
    questionsToSet = shuffleArray([...allQuestions]).slice(0, TOTAL_QUESTIONS_PER_ROUND);
  }

  return questionsToSet.filter(q => q);
}

export const QUIZ_SETTINGS = {
    TOTAL_QUESTIONS_PER_ROUND
};
// Local: src/utils/quizUtils.js

// Constante para definir o tamanho da rodada
const TOTAL_QUESTIONS_PER_ROUND = 10;

/**
 * Algoritmo Fisher-Yates para embaralhar arrays de forma imparcial.
 * @param {Array} array - O array a ser embaralhado.
 * @returns {Array} Um novo array embaralhado.
 */
function shuffleArray(array) {
  const newArray = [...array]; 
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Função principal para carregar as perguntas, implementando Lazy Loading e o Modo Aleatório.
 * @param {string} categoryId - O ID da categoria ou 'random'.
 * @returns {Array} Um array contendo 10 perguntas sorteadas.
 */
export async function getQuizData(categoryId) {
  let questionsToSet = [];

  if (categoryId === 'random') {
    // --- LÓGICA DO MODO ALEATÓRIO (Promise.all) ---
    
    const catRes = await fetch('/data/categories.json');
    const allCategories = await catRes.json();
    
    // Sorteia 10 categorias diferentes
    const randomCategories = shuffleArray([...allCategories]).slice(0, TOTAL_QUESTIONS_PER_ROUND);
    
    // Busca 1 pergunta de cada categoria em paralelo
    questionsToSet = await Promise.all(
      randomCategories.map(async (cat) => {
        const res = await fetch(`/data/questions/${cat.id.toLowerCase()}.json`);
        const data = await res.json();
        // Pega 1 pergunta aleatória das 60
        return data[Math.floor(Math.random() * data.length)];
      })
    );
    
  } else {
    // --- LÓGICA DE CATEGORIA ÚNICA ---
    
    const res = await fetch(`/data/questions/${categoryId.toLowerCase()}.json`);
    if (!res.ok) {
        // Se falhar, tenta lançar erro com status
        const errorText = await res.text();
        throw new Error(`Falha ao carregar arquivo ${categoryId.toLowerCase()}.json. Status: ${res.status}. Detalhe: ${errorText}`);
    }
    
    const allQuestions = await res.json();
    // Embaralha todas as perguntas disponíveis e pega as 10 primeiras
    questionsToSet = shuffleArray([...allQuestions]).slice(0, TOTAL_QUESTIONS_PER_ROUND);
  }

  // O array final deve ter exatamente 10 perguntas
  return questionsToSet.filter(q => q);
}

// Opcional: Exportar a constante para uso em outros lugares
export const QUIZ_SETTINGS = {
    TOTAL_QUESTIONS_PER_ROUND
};
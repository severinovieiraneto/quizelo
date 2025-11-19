/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas do Quizelo
        'brand-purple': '#A78BFA',    // Roxo vibrante para destaque
        'brand-dark': '#0A0A0A',      // Fundo quase preto
        'brand-card': '#1F2937',      // Cor de fundo do card de perguntas/resultados
        'brand-success': '#10B981',   // Verde para acertos
        'brand-error': '#EF4444',     // Vermelho para erros
      },
    },
  },
  plugins: [],
}
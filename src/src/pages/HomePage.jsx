import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/categories.json')
      .then(res => res.json())
      .then(data => {
        // --- NOVA LÓGICA DE ORDENAÇÃO (A-Z) ---
        // Usamos 'localeCompare' com 'pt-BR' para garantir que acentos 
        // sejam ignorados na ordenação (ex: 'Á' vem junto com 'A', não no final)
        const sortedData = data.sort((a, b) => 
          a.name.localeCompare(b.name, 'pt-BR')
        );
        
        setCategories(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar categorias:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-page w-full flex flex-col items-center pb-10 animate-fade-in px-4">
      
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-12 max-w-2xl">
        
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4 tracking-tight transition-colors duration-300">
          Escolha seu Desafio
        </h2>
        
        <p className="text-brand-text-muted text-lg leading-relaxed transition-colors duration-300">
          Explore as <strong className="text-brand-purple">{categories.length} categorias</strong> de conhecimento ou teste sua sorte na Miscelânea.
        </p>
        
      </div>
      
      {/* Grid de Cartões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* --- 1. CARTÃO CORINGA (SEMPRE O PRIMEIRO) --- */}
        <CategoryCard 
          id="random" 
          name="🎲 Miscelânea" 
          description={`Um desafio imprevisível! 10 perguntas sorteadas aleatoriamente entre todas as ${categories.length} áreas do saber.`}
          isFeatured={true} 
        />
        
        {/* --- 2. CARTÕES DAS CATEGORIAS (ORDEM ALFABÉTICA) --- */}
        {categories.map(category => (
          <CategoryCard 
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
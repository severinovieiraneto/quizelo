import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock simples para o fetch não quebrar
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('Página Inicial (HomePage)', () => {
  it('deve renderizar o título principal', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // A Home pode estar em "Loading" primeiro, então usamos findBy (assíncrono) ou aguardamos
    // Como o mock resolve rápido, vamos verificar se o Loader sai ou se o título aparece
    
    // Verifica se o cartão estático (Coringa) está lá
    // Precisamos usar findBy porque o useEffect é assíncrono
    const randomCard = await screen.findByText(/Desafio Aleatório/i);
    expect(randomCard).toBeInTheDocument();
  });
});
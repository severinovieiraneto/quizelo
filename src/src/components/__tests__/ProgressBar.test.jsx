import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressBar from '../ProgressBar';

describe('Componente ProgressBar', () => {
  it('deve renderizar o texto com os valores corretos', () => {
    render(<ProgressBar current={1} total={10} />);
    // Verifica se o texto "1 / 10" aparece na tela
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
  });

  it('deve calcular a largura correta para 50%', () => {
    const { container } = render(<ProgressBar current={5} total={10} />);
    
    // Busca a div que tem a cor roxa (a barra de preenchimento)
    // O seletor pega a div filha interna
    const bar = container.getElementsByClassName('bg-brand-purple')[0];
    
    expect(bar).toHaveStyle('width: 50%');
  });

  it('deve calcular a largura correta para 100%', () => {
    const { container } = render(<ProgressBar current={10} total={10} />);
    const bar = container.getElementsByClassName('bg-brand-purple')[0];
    expect(bar).toHaveStyle('width: 100%');
  });
});
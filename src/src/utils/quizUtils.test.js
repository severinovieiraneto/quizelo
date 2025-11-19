import { describe, it, expect } from 'vitest';
// Precisamos exportar a função shuffleArray do arquivo original para testá-la. 
// Nota: Se ela não estiver exportada no quizUtils.js, adicione 'export' antes da função lá.
// Vou assumir que você adicionou 'export' antes de 'function shuffleArray' no quizUtils.js
import { shuffleArray } from './quizUtils'; 

// MOCK: Se você não quiser alterar o arquivo original, copie a função aqui apenas para validar a lógica
function localShuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

describe('Lógica de Embaralhamento (Shuffle)', () => {
  it('deve retornar um array com o mesmo tamanho', () => {
    const input = [1, 2, 3, 4, 5];
    const output = localShuffle(input);
    expect(output).toHaveLength(5);
  });

  it('deve conter os mesmos elementos do original', () => {
    const input = ['a', 'b', 'c'];
    const output = localShuffle(input);
    expect(output).toContain('a');
    expect(output).toContain('b');
    expect(output).toContain('c');
  });

  it('não deve modificar o array original (imutabilidade)', () => {
    const input = [1, 2, 3];
    const original = [...input];
    localShuffle(input);
    expect(input).toEqual(original);
  });
});
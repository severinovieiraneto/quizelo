# QUIZELO: O Labirinto do Saber
- Pós-graduação em Desenvolvimento Full Stack
- **Autor:** Severino Vieira Neto
- **Orientador:** Alexandre Agustini
- 2025
- PUCRS

## SUMÁRIO
1. [Contextualização da Proposta](#capitulo-1)  
2. **Objetivos da Construção da Solução**  
  2.1. **Aprofundamento nas Tecnologias Centrais do "Modern Web Development Stack"**  
    2.1.1. Implementação de uma Aplicação de Página Única  
    2.1.2. Utilizar o Framework Tailwind  
    2.1.3. Utilizar o Vite  
  2.2. **Desenvolvimento de um Produto de Software Completo (end-to-end) com Foco em "Game Design"**  
    2.2.1. Implementação da Lógica de um "Game Loop"  
    2.2.2. Implementação de um Banco de Dados de Conteúdo JSON
3. **Elaboração da Jornada do Usuário**  
  3.1. **O Jogador Focado (Seleção de Categoria)**  
    3.1.1. Descoberta    
    3.1.2. Seleção  
    3.1.3. Engajamento  
    3.1.4. Feedback  
    3.1.5. Resultado  
  3.2. **O Jogador Casual (Modo Aleatório)**  
    3.2.1. Descoberta  
    3.2.2. Seleção  
    3.2.3. Engajamento  
    3.2.4. Feedback  
    3.2.5. Resultado
4. **Apelo Mercadológico da Solução**
5. **Ciclo de Desenvolvimento da Solução**
6. **Mockup da Proposta de Solução**
7. **Arquitetura de Software**  
  7.1. **Diagrama da Arquitetura de Componentes**  
  7.2. **Modelo de Dados**  
    7.2.1. Metadados de Categorias  
    7.2.2. Definições de Nível  
    7.2.3. Estrutura de Perguntas
8. **Validação da Solução**
9. **Registros das Evidências do Projeto**
10. **Considerações Finais e Expectativas**  
**Referências**

## 1. Contextualização da Proposta {#capitulo-1}
A solução proposta se refere ao desenvolvimento de uma aplicação web de perguntas e respostas, comumente conhecida como quiz. Esta solução, desenvolvida como projeto final desta especialização, foi nominada Quizelo.  
A escolha deste título é um neologismo derivado da união conceitual das palavras: “Quiz" e “Dédalo”. Na mitologia grega, Dédalo foi um gênio inventor e arquiteto, célebre por sua habilidade de criar autômatos e, mais famosamente, por projetar o Labirinto de Creta — uma estrutura complexa destinada a conter o Minotauro (OVÍDIO, 2017).  
O nome Quizelo busca, portanto, evocar a ideia de um labirinto do saber, onde o usuário é desafiado a percorrer por diferentes áreas do conhecimento.  
A partir deste ponto, a solução proposta será referida neste documento por seu título.  
O desenvolvimento do Quizelo oriunda da confluência de duas paixões pessoais do autor: a busca por conhecimento e o universo dos jogos digitais.  
O autor, um entusiasta do estudo autodidata, possui um profundo interesse por temas de humanidades, notadamente Filosofia, História, Geopolítica e Antropologia, mantendo uma biblioteca pessoal substancial dedicada a esses assuntos. Paralelamente, como um consumidor de jogos digitais, o autor sempre nutriu o desejo de desenvolver seu próprio jogo, unindo o lúdico ao intelectual.  
O formato quiz surgiu como a solução ideal para essa fusão. Ele permite a estruturação de um vasto banco de dados de conhecimento – derivado dos próprios interesses e objetos de estudo do autor – dentro de um formato de “game loop” engajador e competitivo.  
Em design de jogos, o "game loop" (ou laço de jogo) é definido como a estrutura de interação central que se repete: o jogador age, o jogo fornece uma resposta e o jogador então faz uma nova escolha, criando um ciclo engajador que se repete até a conclusão da rodada (SCHELL, 2011).  
A motivação central é, portanto, criar uma plataforma social e intelectualmente desafiadora. O Quizelo não é apenas um projeto para testar o conhecimento do usuário, mas também um local onde amigos e colegas possam disputar esse conhecimento de forma saudável, transformando o ato de estudar e lembrar fatos em uma atividade social divertida. O projeto visa preencher a lacuna entre o estudo solitário e o entretenimento interativo.
/**
 * Define os rótulos e descrições para cada nível de dificuldade.
 * A chave (ex: "easy") deve corresponder ao campo "level" nos arquivos JSON de perguntas.
 */
 
export const DIFFICULTY_LEVELS = {
	easy: {
		label: "Fácil",
		description: "Os Fundamentos (Conhecimento Geral). Testa seu conhecimento sobre os fatos, nomes e conceitos mais famosos e amplamente conhecidos."
	},
	medium: {
		label: "Médio",
		description: "A Compreensão (Conhecimento Específico). Exige uma compreensão mais profunda, testando sua capacidade de conectar ideias e entender o contexto."
	},
	hard: {
		label: "Difícil",
		description: "O Domínio (Nível Especialista). Projetado para testar um conhecimento profundo, detalhado e técnico. Um verdadeiro desafio para entusiastas."
	}
};
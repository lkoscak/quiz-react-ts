import { shuffleArray } from "./utils";

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export type QuestionState = Question & { answers: string[] };

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

export const fetchTriviaQuestions = async (
	amount: number,
	difficulty: Difficulty
): Promise<QuestionState[]> => {
	const endpoint = `https:\\opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question: Question) => ({
		...question,
		answers: shuffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]),
	}));
};

import { useState } from "react";

import {
	fetchTriviaQuestions,
	Difficulty,
	QuestionState,
	AnswerObject,
} from "./API";

import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

const App = () => {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);
		const newQuestions = await fetchTriviaQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		);
		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};
	const checkAnswer = (answerValue: string) => {
		if (gameOver) return;
		if (answerValue === questions[number].correct_answer) {
			setScore((prevScore) => prevScore + 1);
		}
		const answer = {
			question: questions[number].question,
			answer: answerValue,
			correct: answerValue === questions[number].correct_answer,
			correctAnswer: questions[number].correct_answer,
		};
		setUserAnswers((prevState) => [...prevState, answer]);
	};
	const nextQuestion = () => {
		if (number + 1 === TOTAL_QUESTIONS) {
			setGameOver(true);
			return;
		}
		setNumber(number + 1);
	};

	return (
		<div className="wrapper">
			<h1>React Quiz</h1>
			{(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
				<button className="start" onClick={startTrivia}>
					Start
				</button>
			)}
			{!gameOver && <p className="score">Score: {score}</p>}
			{loading && <p>Loading questions...</p>}
			{!loading && !gameOver && (
				<QuestionCard
					questionNumber={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
				></QuestionCard>
			)}
			{!gameOver &&
				!loading &&
				userAnswers.length === number + 1 &&
				number !== TOTAL_QUESTIONS - 1 && (
					<button className="next" onClick={nextQuestion}>
						Next question
					</button>
				)}
		</div>
	);
};

export default App;

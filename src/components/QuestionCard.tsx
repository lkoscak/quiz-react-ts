import { AnswerObject } from "../API";

type Props = {
	question: string;
	answers: string[];
	callback: (answerValue: string) => void;
	userAnswer: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}) => (
	<div className="question-wrapper">
		<p className="number">
			Question: {questionNumber} / {totalQuestions}
		</p>
		<p dangerouslySetInnerHTML={{ __html: question }}></p>
		<div>
			{answers.map((answer) => (
				<div className="answer-wrapper" key={answer}>
					<button
						className={
							userAnswer?.correctAnswer === answer
								? "correct"
								: userAnswer?.answer === answer
								? "wrong"
								: ""
						}
						disabled={!!userAnswer}
						onClick={callback.bind(null, answer)}
					>
						<span dangerouslySetInnerHTML={{ __html: answer }}></span>
					</button>
				</div>
			))}
		</div>
	</div>
);

export default QuestionCard;

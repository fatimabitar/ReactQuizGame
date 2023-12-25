import { decode } from "html-entities";
import { useQuiz } from "../QuizContext";

function Result() {
  const { state } = useQuiz();
  return (
    <>
      {state.userAnswer == state.question?.correct_answer ? (
        <div className="result correct">&#10003; You answered correctly!</div>
      ) : (
        <div className="result incorrect">
          &#10005; Your answer is wrong, the correct answer is:
          {decode(state.question?.correct_answer)}
        </div>
      )}
    </>
  );
}

export default Result;

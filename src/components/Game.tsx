import "./Game.scss";
import AnswerOption from "./AnswerOption.tsx";
import Result from "./Result.tsx";
import { useQuiz } from "../QuizContext.tsx";
import { decode } from "html-entities";

function Game() {
  const { state } = useQuiz();
  const question = state.question;
  return (
    <>
      <div className="container game-screen">
        <h2>Question</h2>
        <h4>{decode(question?.question)}</h4>
        <div className="options">
          {question?.incorrect_answers.map((answer) => {
            return <AnswerOption key={answer} answer={answer} />;
          })}
        </div>
        {state.userAnswer && <button>Submit</button>}

        {/* <Result /> */}
      </div>
    </>
  );
}

export default Game;
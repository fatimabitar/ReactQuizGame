import "./App.scss";
import Score from "./components/Score.tsx";
import Game from "./components/Game.tsx";
import { Question, QuestionResponse, useQuiz } from "./QuizContext.tsx";
import { useEffect } from "react";
import axios from "axios";
import Loader from "./components/FullPageLoader.tsx";

function App() {
  const { state, dispatch } = useQuiz();

  function fetchQuestion() {
    dispatch({ type: "setStatus", payload: "fetching" });
    dispatch({ type: "setUserAnswer", payload: null });
    axios
      .get<QuestionResponse>(
        "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple"
      )
      .then(function (response) {
        if (response.data.response_code === 0) {
          const question: Question = response.data.results[0];
          console.log(question);

          const randomIndex = Math.round(
            Math.random() * question.incorrect_answers.length
          );
          question.incorrect_answers.splice(
            randomIndex,
            0,
            question.correct_answer
          );

          dispatch({ type: "setStatus", payload: "ready" });
          dispatch({ type: "setQuestion", payload: question });
        } else {
          dispatch({ type: "setStatus", payload: "error" });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (state.gameStatus == "idle") {
      fetchQuestion();
    }
  });

  return (
    <>
      {" "}
      {state.gameStatus == "fetching" ? (
        <Loader />
      ) : state.gameStatus == "error" ? (
        <p>Error</p>
      ) : (
        <>
          <Score />
          <Game />
        </>
      )}
    </>
  );
}

export default App;

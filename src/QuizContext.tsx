import React, { createContext, useContext, useReducer } from "react";

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}

type Status = "idle" | "fetching" | "ready" | "error" | "answered";

interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}
interface QuizState {
  question: Question | null;
  gameStatus: Status;
  userAnswer: string | null;
  score: Score;
}
export interface Score {
  correct: 0;
  incorrect: 0;
}
type QuizAction =
  | { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question }
  | { type: "setUserAnswer"; payload: string | null }
  | { type: "setScore"; payload: "correct" | "incorrect" };

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
  score: { correct: 0, incorrect: 0 },
};

const QuizContext = createContext<QuizContext>({
  state: initialState,
  dispatch: () => null,
});

export const QuizProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => useContext(QuizContext);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setQuestion":
      return { ...state, question: action.payload };
    case "setUserAnswer":
      return { ...state, userAnswer: action.payload };
    case "setStatus":
      return { ...state, gameStatus: action.payload };
    case "setScore":
      // eslint-disable-next-line no-case-declarations
      const score = state.score;
      score[action.payload] += 1;
      return { ...state, score: score };
    default:
      throw new Error("Unknown action");
  }
}

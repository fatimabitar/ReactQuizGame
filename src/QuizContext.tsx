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

type Status = "idle" | "fetching" | "ready" | "error";

interface QuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}
interface QuizState {
  question: Question | null;
  gameStatus: Status;
  userAnswer: string | null;
}

type QuizAction =
  | { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question }
  | { type: "setUserAnswer"; payload: string };

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
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
    default:
      throw new Error("Unknown action");
  }
}

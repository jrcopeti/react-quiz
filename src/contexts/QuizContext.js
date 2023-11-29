import { createContext, useLayoutEffect, useReducer } from "react";

const SECS_PER_QUESTION = 20;
const POINTS_PER_CORRECT_ANSWER = 10;
const BASE_URL = "https://the-trivia-api.com/v2/questions";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "welcome",
  index: 0,
  userAnswers: [],
  category: null,
  difficulty: null,
  numQuestions: null,
  points: 0,
  highscore: JSON.parse(localStorage.getItem("highScore")) || 0,
  secondsRemaining: null,
};
function calculatePoints(isCorrect) {
  return isCorrect ? POINTS_PER_CORRECT_ANSWER : 0;
}

function processQuestionData(data) {
  return data.map((dataObj) => {
    const options = [...dataObj.incorrectAnswers, dataObj.correctAnswer];

    const shuffleOptions = options.sort(() => Math.random() - 0.5);
    const correctOptionIndex = shuffleOptions.indexOf(dataObj.correctAnswer);
    return {
      ...dataObj,
      options: options,
      correctOptionIndex: correctOptionIndex,
    };
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "startLoading":
      return { ...state, status: "loading" };

    case "startCategorySelection":
      return {
        ...state,
        status: "selectingCategory",
      };

    case "category":
      return {
        ...state,
        category: action.payload,
        status: "selectingDifficulty",
      };

    case "difficulty":
      return {
        ...state,
        difficulty: action.payload,
        status: "selectingNumQuestions",
      };

    case "numQuestions":
      return {
        ...state,
        numQuestions: action.payload,
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECS_PER_QUESTION,
      };

    case "newAnswer":
      const newUserAnswers = [...state.userAnswers];
      if (newUserAnswers[state.index] === undefined) {
        newUserAnswers[state.index] = action.payload;

        const question = state.questions?.at(state.index);
        const isCorrect = action.payload === question.correctOptionIndex;
        const additionalPoints = calculatePoints(isCorrect);

        return {
          ...state,
          userAnswers: newUserAnswers,
          points: state.points + additionalPoints,
          secondsRemaining: SECS_PER_QUESTION,
        };
      }
      // If the answer for the current index is already set, do nothing
      return { ...state };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        secondsRemaining: SECS_PER_QUESTION,
      };

    case "previousQuestion":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : 0,
      };

    case "finish":
      const newHighScore =
        state.points > state.highscore ? state.points : state.highscore;
      localStorage.setItem("highScore", newHighScore);
      return {
        ...state,
        status: "finished",
        highscore: newHighScore,
      };

    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action not supported");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      difficulty,
      category,
      numQuestions,
      userAnswers,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.length * POINTS_PER_CORRECT_ANSWER;

  useLayoutEffect(
    function () {
      if (category && difficulty && numQuestions) {
        dispatch({ type: "startLoading" });
        async function fetchQuestions(difficulty, category, numQuestions) {
          try {
            const res = await fetch(
              `${BASE_URL}?limit=${numQuestions}&categories=${category}&difficulties=${difficulty}`
            );

            if (!res.ok) {
              throw new Error("Something went wrong");
            }
            const data = await res.json();

            const processedData = processQuestionData(data);

            dispatch({ type: "dataReceived", payload: processedData });
          } catch (err) {
            console.error(err.message);
            dispatch({ type: "dataFailed" });
          }
        }
        fetchQuestions(difficulty, category, numQuestions);
      }
    },
    [difficulty, category, numQuestions]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        difficulty,
        category,
        numQuestions,
        userAnswers,
        points,
        highscore,
        secondsRemaining,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizProvider };

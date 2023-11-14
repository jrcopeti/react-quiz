import { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import StartScreen from "../StartScreen/StartScreen";
import Question from "../Question/Question";
import NextButton from "../NextButton/NextButton";
import Progress from "../Progress/Progress";
import FinishedScreen from "../FinishedScreen/FinishedScreen";
import Footer from "../Footer/Footer";
import Timer from "../Timer/Timer";
import WelcomePage from "../WelcomePage/WelcomePage";
import Difficulty from "../Difficulty/Difficulty";
import Category from "../Category/Category";
import NumQuestions from "../NumQuestions/NumQuestions";
import PreviousButton from "../PreviousButton/PreviousButton";
import "./App.css";

const SECS_PER_QUESTION = 1500000000000000000;
const POINTS_PER_CORRECT_ANSWER = 10;

function calculatePoints(isCorrect) {
  return isCorrect ? POINTS_PER_CORRECT_ANSWER : 0;
}

const initialState = {
  questions: [],
  // "loading", "error", "preparing", "ready", "active", "finished"
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

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

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
        status: "loading",
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
        const additionalPoints = calculatePoints(isCorrect, question);

        return {
          ...state,
          userAnswers: newUserAnswers,
          points: state.points + additionalPoints,
          secondsRemaining: SECS_PER_QUESTION,
        };
      }
      // If the answer for the current index is already set, just return the current state
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

export default function App() {
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

  useEffect(
    function () {
      if (category && difficulty && numQuestions) {
        async function fetchQuestions(difficulty, category, numQuestions) {
          try {
            const res = await fetch(
              `https://the-trivia-api.com/v2/questions?limit=${numQuestions}&categories=${category}&difficulties=${difficulty}`
              // `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "welcome" && <WelcomePage dispatch={dispatch} />}
        {status === "selectingCategory" && <Category dispatch={dispatch} />}
        {status === "selectingDifficulty" && <Difficulty dispatch={dispatch} />}
        {status === "selectingNumQuestions" && (
          <NumQuestions dispatch={dispatch} />
        )}

        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            category={category}
            difficulty={difficulty}
            dispatch={dispatch}
          />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={userAnswers[index]}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={userAnswers[index]}
            />
          </>
        )}
        {status === "active" && (
          <>
            <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <PreviousButton
                dispatch={dispatch}
                answer={userAnswers[index]}
                numQuestions={numQuestions}
                index={index}
              />
              <NextButton
                dispatch={dispatch}
                answer={userAnswers[index]}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

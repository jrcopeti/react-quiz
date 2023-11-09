import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import WelcomePage from "./WelcomePage";
import Difficulty from "./Difficulty";
import Category from "./Category";
import NumQuestions from "./NumQuestions";

const SECS_PER_QUESTION = 20;
const POINTS_PER_CORRECT_ANSWER = 10;

function calculatePoints(isCorrect) {
  return isCorrect ? POINTS_PER_CORRECT_ANSWER : 0;
}

const initialState = {
  questions: [],
  // "loading", "error", "preparing", "ready", "active", "finished"
  status: "welcome",
  index: 0,
  answer: null,
  category: null,
  difficulty: null,
  numQuestions: null,
  points: 0,
  highscore: 0,
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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

      case "newAnswer":
        const question = state.questions?.at(state.index);
        const isCorrect = action.payload === question.correctOptionIndex;
        const additionalPoints = calculatePoints(isCorrect, question); // or other parameters
        return {
          ...state,
          answer: action.payload,
          points: state.points + additionalPoints,
        };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
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

function processQuestionData(questionData) {
  return questionData.map((questionObj) => {
    const options = [
      ...questionObj.incorrectAnswers,
      questionObj.correctAnswer,
    ];
    options.sort(() => Math.random() - 0.5); // Shuffle options
    const correctOptionIndex = options.indexOf(questionObj.correctAnswer);
    return {
      ...questionObj,
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
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // const numQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0
  // );

  useEffect(
    function () {
      if (category && difficulty && numQuestions) {
        async function fetchQuestions(difficulty, category, numQuestions) {
          try {
            const res = await fetch(
              `https://the-trivia-api.com/v2/questions?limit=${numQuestions}&categories=${category}&difficulties=${difficulty}`
              // `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
            );
            console.log(difficulty, category, numQuestions);
            if (!res.ok) {
              throw new Error("Something went wrong");
            }
            const data = await res.json();
            console.log(data);
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
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              // maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            // maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

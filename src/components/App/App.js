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

import { useQuiz } from "../../hooks/useQuiz";

import "./App.css";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "welcome" && <WelcomePage />}
        {status === "selectingCategory" && <Category />}
        {status === "selectingDifficulty" && <Difficulty />}
        {status === "selectingNumQuestions" && <NumQuestions />}

        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
          </>
        )}
        {status === "active" && (
          <>
            <Footer>
              <Timer />
              <PreviousButton />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

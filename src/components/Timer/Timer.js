import React, { useEffect } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import "./Timer.css";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();

  // const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch, secondsRemaining]
  );

  return (
    <div className={secondsRemaining < 6 ? "timer-finishing" : "timer"}>
      {seconds}
    </div>
  );
}

export default Timer;

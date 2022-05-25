import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import renderTime from "./remain"

import "./style.css";

export default function Timer() {
  return (
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={300}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: false})}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

  );
}



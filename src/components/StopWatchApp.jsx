import React, { useEffect, useRef, useState } from "react";

const StopWatchApp = () => {
  const [run, setRun] = useState(false);
  const [time, setTime] = useState(0);
  const timeOut = useRef();

  useEffect(() => {
    if (run) {
      timeOut.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(timeOut.current);
  }, [run]);

  const handleStartStop = (check, idInterval) => {
    if (check) {
      clearInterval(idInterval);
    }
    setRun((run) => !run);
  };

  const formatTime = (time) => {
    let second = Math.floor(time % 60);
    let minute = Math.floor((time / 60) % 60);
    let hour = Math.floor((time / 3600) % 60);

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <div className="timer">{formatTime(time)}</div>

      <div className="container">
        <button
          className={`btn`}
          style={{ backgroundColor: `${run ? "red" : ""}` }}
          onClick={() => handleStartStop(run, timeOut.current)}
        >
          {run ? "Stop" : "Start"}
        </button>
        <button className="btn" onClick={() => setTime(0)}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default StopWatchApp;

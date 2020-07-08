import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [startTime, setStartTime] = useState(null);
  const [displayTime, setDisplayTime] = useState("00:00:00.00");

  useEffect(() => {
    const time = new Date().getTime();
    setStartTime(time);
    const interval = setInterval(() => {
      const duration = new Date().getTime() - startTime;
      const display = props.convertToTimeDisplay(duration);
      setDisplayTime(display);
    }, 1);

    return () => clearInterval(interval);
  });

  return <div>{displayTime}</div>;
};

export default Timer;

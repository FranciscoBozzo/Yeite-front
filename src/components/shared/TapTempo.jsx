import React from "react";
import Counter from "./components/Counter";
import Button from "./components/Button";
import { useState, useEffect, useRef } from "react";
//lies for 1-5 bpm, i guess its about setInterval method
//click on enter or ws
//adaptive screen size, no scroll on mobile devices
function BpmCounter() {
  let timerID = useRef();
  let counter = useRef(0);
  const [bpm, setBpm] = useState(0);
  const [clickTime, setClickTime] = useState([]);

  const handleButtonClick = () => {
    if (counter.current) {
      clearInterval(timerID.current);
      setClickTime([...clickTime, counter.current]);
      counter.current = 0;
      timerID.current = setInterval(() => counter.current++, 10);
      console.log("pass1");
    } else if (!counter.current) {
      timerID.current = setInterval(() => counter.current++, 10);
      console.log("pass2");
    }
    console.log(clickTime);
  };

  useEffect(() => {
    if (!clickTime.length) {
      return;
    }
    if (clickTime.length >= 21) {
      setClickTime([clickTime.at(-1)]);
    }
    if (clickTime.length)
      setBpm(
        Math.floor(
          6000 /
            (clickTime.reduce((acc, iter) => acc + iter) / clickTime.length)
        )
      );
  }, [clickTime]);

  return (
    <div className="body">
      <div className="wrapper">
        {bpm}
        <button onClick={handleButtonClick}>tap</button>
      </div>
    </div>
  );
}

export default BpmCounter;

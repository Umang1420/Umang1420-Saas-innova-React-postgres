import { useState, useEffect } from "react";

export default function Color() {
  const [color, setColor] = useState("white");


  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <>
     <h1>Current Color: {color}</h1> 
     <div className="btns">
        <button onClick={() => setColor("red")} id="red">Red</button>
        <button onClick={() => setColor("blue")} id="blue">Blue</button>
        <button onClick={() => setColor("green")} id="green">Green</button>
        <button onClick={() => setColor("yellow")} id="yellow">Yellow</button>
        <button onClick={() => setColor("white")} id="white">Reset</button>
     </div>
    </>
  );
}





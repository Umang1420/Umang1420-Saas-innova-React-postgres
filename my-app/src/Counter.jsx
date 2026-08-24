import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

 
  function increment() {
    setCount(count + 1);
  }
  function decrement(){
    if(count !== 0){
        setCount(count - 1);
    }
  }
  

  return (
    <>  
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </>
  );
}   
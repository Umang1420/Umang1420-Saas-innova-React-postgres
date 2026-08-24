import React, { useState , useEffect } from "react";

function Auto(){
    const [count , setCount] = useState(0);
    const [IsRunning , setIsRunning] = useState(false);
    
    useEffect(() => {
    if(!IsRunning) return;
        const timer = setInterval(() => {
             setCount((prevCount) => prevCount + 1);
        }, 1000);
        return () => clearInterval(timer);
    },[IsRunning]);
    
    return (
        <>
            <h1>Auto Counter : {count}</h1>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>Stop</button>
            <button onClick={() => { setIsRunning(false); setCount(0); }}>Reset</button>
        </>
    )
}   


export default Auto;        
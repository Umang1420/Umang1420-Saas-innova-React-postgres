import { useState } from "react";
import { useEffect } from "react";


export default function Quiz(){
    const [count, setCount] = useState<number>(0);
    const [log,setLog] = useState<number[]>([]);
    const [math, setMath] = useState<number>(0);
    const handleIncrease = ()=>{
        setCount((pre)=>(pre + 10))
        console.log(log.length)
        if(log.length === 5){
            setLog((prev) => [...prev.slice(1), count])
        }else{
            setLog((prev) => [...prev, count])
        }
    }
     const handleDecrease = ()=>{
        if(count === 0) return;
        setCount((pre)=>(pre - 5))
        if(log.length === 5){
            setLog((prev) => [...prev.slice(1), count])
        }else{
            setLog((prev) => [...prev, count])
        }
    }
    
    const handleUndo = () =>{
        if (log.length === 0) return;
        const lastValue = log[log.length - 1];
        setCount(lastValue);
        setLog((prev) => prev.slice(0, -1));
    }
   
    const expensiveOperation = () => {
        let total = 0;

        for (let i = 0; i < 10000; i++) {
            total += i;
            console.log(total)
        }

        setMath(total);
    };

    useEffect(()=>{
        console.log("Component Mounted");    
       

        return ()=>{console.log("Component unmounted")}
    },[count])
    return (
        <><br/>
        <h5>You can only go 5 last changes back With Undo</h5><br/>
        <h1>{count}</h1>
        <button onClick={handleIncrease}>Correct Ans</button>
        <button onClick={handleDecrease}>Wrong Ans</button>
        <ul>
            {log.map((users, index)=>(
                <li key={index}> {users} </li>
            ))}
        </ul>
        <button onClick={handleUndo}>Undo</button>
        <br/><button onClick={expensiveOperation}>Show</button><p>{math}</p>
        </>
    ) 

}           
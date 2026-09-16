import { useState } from "react";

export default function Counter(){
    const [count,setCount] = useState(0)
    const [word,setWord] = useState("")

    const handleDecrement = () =>{
        if(count === 0 ){
            alert('value is zero')
        }else{
            setCount((pre)=>(pre - 1))
        }
    }

return( 
    <>
    <div className="counter">

    <div className="num-counter">

        <h1>Number Count</h1>
        <p>{count}</p>
        <button onClick={()=>setCount((pre)=>(pre + 1))}>Increment with 1</button>
        <button onClick={handleDecrement}>Decrement with 1</button>
        <button onClick={()=>setCount(0)}>Reset Counter</button>

    </div>
    <div className="ch-counter">

        <h1>Character Counter</h1>
        <label>Write Bio: </label>
        <input  type="text" value={word} onChange={(e)=>setWord(()=>(e.target.value))}/>
        <p style={{backgroundColor:'beige'}}>{word.trim()}</p>
        <p style={{fontSize : '15px', color : 'red'}}>{ word.length> 100 ? 'You Exceed the text limit ':''}</p><br/><br/>
        <p style={{color : word.length > 100 ? 'red' : 'black'}}>Character Length: {word.trim().length}</p>
    </div>
    </div>
    </>
)
}
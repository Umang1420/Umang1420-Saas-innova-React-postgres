import { useRef } from "react";

export default function Focus(){
    const inputRef : any = useRef<HTMLInputElement>(null);
    const handleFocus = ()=>{
        inputRef.current.focus()
    }

    const countRef = useRef<number>(0)

    const handleCount = ()=>{
       countRef.current = countRef.current + 1;
        console.log(countRef.current);
    }

    const playRef = useRef<boolean>(false)

    const handlePlay = ()=>{
        if(playRef.current === true){
            playRef.current = false;
        }else{
            playRef.current = true;
        }
    }

    return (
        <>
        <input type="text" ref={inputRef} />
        <button onClick={handleFocus}>Focus</button>
        <button onClick={handleCount}>Add</button>
        <button onClick={handlePlay}>{playRef.current ? "Running" : "Start"}</button>
        </>
    )
}
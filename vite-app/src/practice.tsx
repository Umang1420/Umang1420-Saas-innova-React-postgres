import { useRef, useState } from "react";

export default function Practice(){
    const [likeCount,setLikeCount] = useState<number>(0);
    const [show,setShow] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0);
    const [todo,setTodo] = useState<string>('');
    const [todoList, setTodoList] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    function incrementTwice() {
        setCount((count)=>count + 1);
        setCount((count)=>count + 1);
    }

    function handleAdd(){
        setTodoList((pre)=>[...pre, todo])
        todoList.push(todo);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        console.log(todoList);
    }

    const handleClick=()=>{
       setLikeCount(likeCount + 1)
    }
    const handleShow=()=>{
        
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }

 return (
    <>
        <p>{likeCount % 2 === 0 ? "🤍 Like" : "❤ Liked"}</p>
        <button onClick={handleClick}>Like {likeCount} Count</button><br></br><br></br>

        <input type={show ? "text" : "password"} ></input>
        <button onClick={handleShow}>Show password</button>
        <br></br><br></br>

        <button onClick={incrementTwice}>{count}</button>
        <br></br><br></br>
        {/* <input type="text" value={(e:string)=>(e.target.value)}></input> */}
         <input
            type="text"
            value={todo}
            ref={inputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
         />

         <button onClick={handleAdd}>Add</button>

         <ul>
            {todoList.map((item, index) => (
                <>
                <li key={`${item}-${index}`}
                style={{
                display: "flex",
                alignItems: "center",
                margin: "5px 0"}}>{item}</li>
                <input type="checkbox"></input>
              </>
            ))}
         </ul>
    </>
 )
}   
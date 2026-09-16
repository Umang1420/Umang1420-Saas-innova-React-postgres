import { useState } from "react"

let nextId = 0;
export default function Form(){
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[course,setCourse] = useState("")

    const[user,setUser] = useState([])

    const handleSubmit = (e) => {
        setName("")
        setEmail("")
        setCourse("")
        e.preventDefault()
    }
    return (
        <>
        <div className="names-div">
            <div className="names-data">

            
                <form onSubmit={handleSubmit}>
                    <h1>Form</h1>
                    <label>Name</label><br/>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input><br/><br/>
                    <label>Email</label><br/>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/><br/>
                    <label>Course</label><br/><br/>
                    <select  onChange={(e)=>setCourse(e.target.value)}>
                        <option defaultValue={'Select Course'}> Select Course</option>
                        <option value={'BCA'}>BCA</option>
                        <option value={'MCA'}>MCA</option>
                        <option value={'B.Tech'}>B.Tech</option>
                    </select><br/><br/>
                    <button type="submit"  onClick={()=>{
                        setUser([...user,{id : nextId++ , name : name, email : email, course : course}])
                    }}>Submit</button>
                </form>
                <div className="names-list">

                {nextId !== 0 ? <ul>
                    {user.map(user => (
                        <>
                        <li key={user.id}> Name : {user.name} <br/> Email : {user.email} <br/> Course : {user.course}</li><br/>
                        </> 
                    ))}
                </ul> : <p>No names registered yet</p>}
                </div>
            </div>
        </div>
        </>
    )
}   
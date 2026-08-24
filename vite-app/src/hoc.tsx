import { useContext } from "react";
import {loginContext} from "./context/login"
import { useState } from "react";

interface userdata {
  name: string,
  email : string,
  password : string
}

export default function Form() {
  const user = useContext(loginContext)
  const [data, setData] = useState<userdata>({
    name: "",
    email: "",
    password: ""
  })


  const [submittedUsers, setSubmittedUsers] = useState<userdata[]>([])


  
  const handleData = () => {
    const trimmedName = data.name.trim();
    const trimmedEmail = data.email.trim();
    const trimmedPassword = data.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) return;
    

    setSubmittedUsers((prev) => [
      ...prev, 
      { name: trimmedName, email: trimmedEmail, password: trimmedPassword }
    ]);

  
    setData({
      name: "",
      email: "",
      password: ""
    });
  }
  
  return (
<>
      <h1>{`Hello ${user}`}</h1><br></br>
    
  
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label><br />
        <input
          type="text"
          value={data.name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        /><br /><br />
        
        <label>Email:</label><br />
        <input
          type="email"
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        /><br /><br />  
        
        <label>Password:</label><br />
        <input
          type="password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        /><br /><br />
        
        <button type="button" onClick={handleData}>Submit</button>
        <br /><br />
        
        
        {submittedUsers.length > 0 && (
          <div>
            <h3>Submitted Users:</h3>
            {submittedUsers.map((user, index) => (
              <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
              </div>
            ))}
          </div>
        )}
      </form>
      </>
  )
  
}

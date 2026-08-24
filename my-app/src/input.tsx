import { useState } from "react";

function Input() {

  const [name, setName] = useState("");


  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <h1> Hello: {name.trim() || "Enter Your name"}</h1>
      <br />
      

      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
        placeholder="Type your name..."
      />
    </>
  );
}

export default Input;

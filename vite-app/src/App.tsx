import Route from "./routes/route"
import "reflect-metadata"
// src/App.tsx
import { useEffect, useState } from "react";


export function App() {
    const [message, setMessage] = useState("");

  useEffect(() => {
    // Call your Node.js backend server
    fetch("http://localhost:3000/api/data")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <>
    <Route />
        <div>
      <h1>Frontend React App</h1>
      <p>Backend says: {message}</p>
    </div>
    </>
  );
}

export default App;
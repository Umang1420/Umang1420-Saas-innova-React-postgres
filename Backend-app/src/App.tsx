// @ts-nocheck
import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.first_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

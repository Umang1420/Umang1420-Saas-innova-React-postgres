import React from 'react';
import { useState, useEffect } from 'react';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data: User[]) => {
        const sortedData = data.sort((a, b) => a.id - b.id);
        setUsers(sortedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


 const handleAdd = () => {
    let fName = prompt("Enter new First Name:");
    let lName = prompt("Enter new Last Name:");
    let activeInput = prompt("Is user active? (type 'true' or 'false'):");

    if (!fName || !lName || !activeInput) return;

    const isUserActive = activeInput.toLowerCase() === 'true';

    fetch(`http://localhost:5000/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: fName , lastName : lName , isActive : isUserActive})
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to Insert user");
        return res.json();
      })
 
    .then((newUser: User) => { 
       setUsers((prevUsers) => [...prevUsers, newUser]);
    })
     .catch((err) => console.error("Error creating user:", err));
  };
//   const handleAdd = () => {
//   let fName = prompt("Enter First Name:");
//   let lName = prompt("Enter Last Name:");
//   let activeInput = prompt("Is user active? (type 'true' or 'false'):");
  
//   if (!fName || !lName || !activeInput) return;

//   // Convert the text input string ("true") into an actual boolean
//   const isUserActive = activeInput.toLowerCase() === 'true';

//   fetch(`http://localhost:5000/users/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ 
//       firstName: fName, 
//       lastName: lName, 
//       isActive: isUserActive 
//     })
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to Insert user");
//       return res.json(); // This must return the newly created user object with its new database ID
//     })
//     .then((newUser: User) => {
//       //  FIX: Append the new user to the end of your existing state array
//       setUsers((prevUsers) => [...prevUsers, newUser]);
//     })
//     .catch((err) => console.error("Error creating user:", err));
// };


  const handleEdit = (userId: number) => {
    console.log("Target User ID:", userId); 

    let input = prompt("Enter new First Name:");
    if (!input) return;

    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: input })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      })
      .then(() => {
    
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, firstName: input } : user))
        );
      })
      .catch((err) => console.error("Error updating user:", err));
  };

    const handleDelete = (userId: number) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'DELETE', 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete user");
        return res.json();
      })
      .then(() => {
       
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      
      <div>
        <h2>User List</h2>

        <div>
          <button onClick={handleAdd}>Add Users</button>
        </div>
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: '8px' }}>
              <strong>Name:</strong> {user.firstName} {user.lastName} | 
              <strong> Status:</strong> {user.isActive ? "Active" : "Not-Active"} 
              
              <button onClick={() => handleEdit(user.id)} style={{ marginLeft: '10px' }}>Edit</button> 
               <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default App;

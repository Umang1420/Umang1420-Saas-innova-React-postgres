import React from "react";
import { useState, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        // const sortedData = data.sort((a, b) => a.id - b.id);
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleAdd = () => {
    // setFName(prompt("Enter new First Name:");)
    // let lName = prompt("Enter new Last Name:");
    // let activeInput = prompt("Is user active? (type 'true' or 'false'):");

    if (!fName || !lName || !active) return;

    const isUserActive = active.toLowerCase() === "true";

    fetch(`http://localhost:5000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        isActive: isUserActive,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to Insert user");
        return res.json();
      })

      .then((newUser: User) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      })
      .catch((err) => console.error("Error creating user:", err));

      setFName("")
      setLName("")
      setActive("")
      setIsAdd(false)
  };

  const handleEdit = (userId: number) => {
    const confirmEdit = window.confirm(
      "Note : don't left any field empty otherwise data will be not updated",
    );
    if (!confirmEdit) return;

    let fName = prompt("Update First Name:");
    let lName = prompt("Update Last Name:");
    let activeInput = prompt("Is user active? (type 'true' or 'false'):");

    if (!fName || !lName || !activeInput) return;

    const isUserActive = activeInput.toLowerCase() === "true";

    fetch(`http://localhost:5000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        isActive: isUserActive,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  firstName: fName,
                  lastName: lName,
                  isActive: isUserActive,
                }
              : user,
          ),
        );
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleDelete = (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/users/${userId}`, {
      method: "DELETE",
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
    <div>
      <h2>User List</h2>
      <button onClick={() => setIsAdd((prev) => !prev)}>
        {isAdd ? "Hide Form" : "Add Users"}
      </button>
      <br></br>
      <br></br>

      <div style={{ display: isAdd ? "block" : "none" }}>
        <label>First Name:</label>
        <input
          type="text"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <br></br>
        <br></br>

        <label>Last Name:</label>
        <input
          type="text"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
        <br></br>
        <br></br>

        <label>Is user Active?(true or false only):</label>
        <input
          type="text"
          value={active}
          onChange={(e) => setActive(e.target.value)}
        />
        <br></br>
        <br></br>

        <button onClick={handleAdd}>Submit</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "8px" }}>
            <strong>Name:</strong> {user.firstName} {user.lastName} |
            <strong> Status:</strong> {user.isActive ? "Active" : "Not-Active"}
            <button
              onClick={() => handleEdit(user.id)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              style={{ marginLeft: "5px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

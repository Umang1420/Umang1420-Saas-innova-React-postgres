import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import Welcome from "./welcome";

function App() {
  return (
    <>
      <div className="nav-div">
        <nav>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                marginRight : "10px",
                color: isActive ? "red" : "white",
              };
            }}
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                marginRight : "10px",
                color: isActive ? "red" : "white",
              };
            }}
            className="nav-link"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                marginRight : "10px",
                color: isActive ? "red" : "white",
              };
            }}
            className="nav-link"
            to="/names"
          >
            Names
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                marginRight : "10px",
                color: isActive ? "red" : "white",
              };
            }}
            className="nav-link"
            to="/counter"
          >
            Counter
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </>
  );
}

export default App;

// <NavLink

//     to={`/invoices/${invoice.number}`}
//     key={invoice.number}
//   >
//     {invoice.name}
//   </NavLink>

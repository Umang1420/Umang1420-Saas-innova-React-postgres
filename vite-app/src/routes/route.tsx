import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Timer from "../title.tsx";
import Counter from "../todo.tsx";
import Form from "../hoc.tsx";
import { loginContext, ThemeContext } from "../context/login.tsx";
import Toolbar from "../toolbar.tsx";
import Comparison from "../comparison.tsx";
import Practice from "../practice.tsx";
// import Api from "../api.tsx";
import "../app.css";
import { ImportantForm } from "../ImportantForm.tsx";
import Cart from "../cart.tsx"
import Quiz from "../quiz.tsx"
import Window from "../window.tsx"
import Focus from "../focus.tsx";

const user = "Alex";
const theme = "dark";

function AppLayout() {
  return (
    <>
      <nav>
        <Link className="links" to="/">Home</Link>
        <Link className="links" to="/counter">Counter</Link>
        <Link className="links" to="/form">Form</Link>
        <Link className="links" to="/timer">Timer</Link>
        <Link className="links" to="/toolbar">Toolbar</Link>
        <Link className="links" to="/comparison">Comparison</Link>
        {/* <Link className="links" to="/api">Api</Link> */}
        <Link className="links" to="/practice">Practice</Link>
        <Link className="links" to="/important">ImpForm</Link>
        <Link className="links" to="/cart">Cart</Link>
        <Link className="links" to="/quiz">Quiz</Link>
        <Link className="links" to="/window">Window</Link>
        <Link className="links" to="/focus">Focus</Link>
      </nav>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <h1>Welcome Home</h1> },
      { path: "/counter", element: <Counter /> },
      {
        path: "/form",
        element: (
          <loginContext.Provider value={user}>
            <Form />
          </loginContext.Provider>
        ),
      },
      {
        path: "/timer",
        element: (
          <loginContext.Provider value={user}>
            <Timer />
          </loginContext.Provider>
        ),
      },
      {
        path: "/toolbar",
        element: (
          <ThemeContext.Provider value={theme}>
            <Toolbar />
          </ThemeContext.Provider>
        ),
      },
      { path: "/comparison", element: <Comparison /> },
      { path: "/practice", element: <Practice /> },
      // { path: "/api", element: <Api /> },
      // { path: "/Api", element: <Api /> },
      { path: "/important", element: <ImportantForm /> },
      { path: "/cart", element: <Cart /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/window", element: <Window /> },
      { path: "/focus", element: <Focus /> }
    ],
  },
]);

const route = () => <RouterProvider router={router} />;

export default route;

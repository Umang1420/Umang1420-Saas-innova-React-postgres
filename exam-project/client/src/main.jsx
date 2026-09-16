import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Counter from "./counter";
import Form from "./Names";
import Welcome from "./welcome";
import About from "./about";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="names" element={<Form />} />
        <Route path="counter" element={<Counter />} />
        <Route path="*"
          element={
            <main style={{ fontSize: "2rem" , padding: "1rem" }}>
            <p><strong>404</strong> Page not Found</p>
          </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);


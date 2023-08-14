import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home/home";
import SignIn from "./component/signin/signin";
import ErrorPage from "./pageError";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;

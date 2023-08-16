import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home/home";
import SignIn from "./component/signin/signin";
import SignUp from "./component/signup/signup";
import Todo from "./component/todo/todo";
import ErrorPage from "./pageError";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // 토큰이 있다면 Todo 페이지로 리다이렉트
      navigate("/todos");
    }
  }, []);

  if (token && window.location.pathname !== "/todo") {
    navigate("/todo");
  }
  return (
    <div className="App">
      <AppContext.Provider value={{ token, setToken, logout }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;

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
  const paths = ["/", "/signin", "/signup", "/todo"];

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && paths.includes(window.location.pathname)) {
      // 토큰이 있다면 Todo 페이지로 리다이렉트
      // paths 외 다른 페이지 접근시에는 404 error 페이지롤 보여준다.
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{ token, setToken }}>
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

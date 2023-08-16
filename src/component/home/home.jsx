import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>To-Do list</h1>
      <button
        data-testid="signin-button"
        onClick={() => {
          navigate("/signin");
        }}
      >
        로그인
      </button>
      <button
        data-testid="signup-button"
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </div>
  );
}

export default Home;

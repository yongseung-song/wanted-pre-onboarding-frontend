import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //이메일 유효성 검사
  const isValidEmail = (email) => {
    return email.includes("@");
  };

  //비밀번호 유효성 검사
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  function submitForm(email, password) {
    return fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email) || !isValidPassword(password)) {
      alert("잠시 후 다시 시도해주십시오.");
    }
    try {
      const response = await submitForm(email, password);
      if (response.ok) {
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert("이미 존재하는 계정입니다.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div className="container">
      <h1>회원 가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="이메일"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleChange}
          data-testid="email-input"
        />
        {isValidEmail(email) ? (
          " "
        ) : (
          <span>이메일은 '@'를 포함해야합니다.</span>
        )}
        <input
          placeholder="암호"
          name="password"
          type="password"
          value={password || ""}
          onChange={handleChange}
          data-testid="password-input"
        />
        {isValidPassword(password) ? (
          " "
        ) : (
          <span>비밀번호는 여덟자리 이상이어야 합니다.</span>
        )}
        <button
          type="submit"
          disabled={!isValidEmail(email) || !isValidPassword(password)}
          data-testid="signup-button"
        >
          회원 가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;

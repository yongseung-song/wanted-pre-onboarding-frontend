import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../util/authContext";
import { AppContext } from "../../App";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  const isValidEmail = (email) => {
    return email.includes("@");
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  function submitForm(email, password) {
    return fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
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
        const data = await response.json();
        localStorage.setItem("jwtToken", data.access_token);
        setToken(jwtToken);
        navigate("/todo");
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
        alert("존재하지 않는 계정입니다.");
        // throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }
  return (
    <div className="container">
      <h1>로그인</h1>
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
          disabled={!isValidPassword(password) || !isValidEmail(email)}
          data-testid="signin-button"
        >
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;

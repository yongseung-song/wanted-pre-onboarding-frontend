import React from "react";

function SignIn() {
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={() => {}}>
        <label>
          아이디
          <input name="email" type="email" data-testid="email-input" />
        </label>
        <br />
        <label>
          비밀번호
          <input name="password" type="password" data-testid="password-input" />
        </label>
        <button type="submit" disabled={true} data-testid="signin-button">
          로그인
        </button>
      </form>
    </div>
  );
}

export default SignIn;

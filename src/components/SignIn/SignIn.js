import React, { useState, useEffect } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (jwtToken) {
      navigate('/todo');
    }
  }, [jwtToken, navigate]);

  const isValidEmail = (email) => {
    return email.includes('@');
  };
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email) || !isValidPassword(password)) {
      alert('잠시 후 다시 시도해주십시오.');
    }
    try {
      const response = await submitForm(email, password);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.access_token);
        navigate('/todo');
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('비밀번호를 다시 확인하세요.');
    }
  }

  function submitForm(email, password) {
    return fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>SignIn</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              아이디
              <input
                name="email"
                type="email"
                value={email || ''}
                onChange={handleChange}
                data-testid="email-input"
              />
            </label>
            <br />
            <label>
              비밀번호
              <input
                name="password"
                type="password"
                value={password || ''}
                onChange={handleChange}
                data-testid="password-input"
              />
            </label>
            <button
              type="submit"
              disabled={!isValidEmail(email) || !isValidPassword(password)}
              data-testid="signin-button"
            >
              로그인
            </button>
          </form>
        </div>
        <p className="signin">
          아이디는 '@'를 포함해야 하며, 비밀번호는 8자리 이상으로 이루어져야
          합니다.
        </p>
      </div>
    </div>
  );
}

export default SignIn;

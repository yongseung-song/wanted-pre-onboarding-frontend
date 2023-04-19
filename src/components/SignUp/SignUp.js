import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
function SignUp() {
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
        navigate('/signin');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        alert('이미 존재하는 계정입니다.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  function submitForm(email, password) {
    return fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
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
    // console.log(name, value);
  };

  return (
    <div>
      <div className="container">
        <h1>SignUp</h1>
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
              data-testid="signup-button"
            >
              회원가입
            </button>
          </form>
        </div>
        <p className="signup">
          아이디는 '@'를 포함해야 하며, 비밀번호는 8자리 이상으로 이루어져야
          합니다.
        </p>
      </div>
    </div>
  );
}
export default SignUp;

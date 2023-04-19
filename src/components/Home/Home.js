import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="home">This is home page</h1>
      <p className="home">송용승의 과제입니다.</p>
      <div>
        <button
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

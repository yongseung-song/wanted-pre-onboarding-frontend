import Reacts from 'react';
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import ToDoList from '../ToDoList/ToDoList';
import logo from './logo.svg';
import './App.css';

function App() {
  const jwtToken = localStorage.getItem('jwtToken');
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>} />
      </Routes>
    </div>
  );
}

export default App;

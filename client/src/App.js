import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup/Signup';
import Term from './pages/Signup/Term';
import HomeMain from './pages/HomeMain';
import JoinForm from './pages/Signup/JoinForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/nail" element={<h2>네일</h2>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signup/term" element={<Term />}></Route>
        <Route path="/signup/joinform" element={<JoinForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;

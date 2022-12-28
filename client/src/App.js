import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeMain from './pages/HomeMain';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/nail" element={<h2>네일</h2>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;

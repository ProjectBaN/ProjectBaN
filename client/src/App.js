import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HomeMain from './pages/HomeMain';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/nail" element={<h2>네일</h2>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup/Signup';
import Term from './pages/Signup/Term';
import HomeMain from './pages/HomeMain';
import JoinForm from './pages/Signup/JoinForm';
import SignupOk from './pages/Signup/SignupOk';
import ProductSearch from './pages/ProductSearch/ProductSearch';
import SignIn from './pages/SignIn/SignIn';
import SignupFailMain from './components/Signup/SignupFail/body/SignupFailMain';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/nail" element={<h2>네일</h2>}></Route>
        <Route path="/search" element={<ProductSearch />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signup/term" element={<Term />}></Route>
        <Route path="/signup/joinform" element={<JoinForm />}></Route>
        <Route path="/signup/ok" element={<SignupOk />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="signup/fail" element={<SignupFailMain />}></Route>
      </Routes>
    </div>
  );
}

export default App;

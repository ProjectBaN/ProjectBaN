import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncLogoutUser } from '../../../redux/reducer/loginSlice';

function Logout() {
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    dispatch(asyncLogoutUser()).then((result) => {});
  };
  return <button onClick={logout}>로그아웃</button>;
}

export default Logout;

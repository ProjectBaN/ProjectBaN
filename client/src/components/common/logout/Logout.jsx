import React from 'react';
import { useDispatch } from 'react-redux';
import { persistor } from '../../..';
import { asyncLogoutUser } from '../../../redux/reducer/loginSlice';

function Logout() {
  const dispatch = useDispatch();

  const logouPurge = async () => {
    console.log('하이');
    await persistor.purge();
  };
  const logout = (e) => {
    e.preventDefault();
    try {
      dispatch(asyncLogoutUser()).then((result) => {});
      setTimeout(logouPurge, 300);
    } catch {}
  };
  return <button onClick={logout}>로그아웃</button>;
}

export default Logout;

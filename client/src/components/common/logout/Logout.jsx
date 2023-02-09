import React from 'react';

function Logout() {
  const Logout = (e) => {
    e.preventDefault();
  };
  return <button onClick={Logout}>로그아웃</button>;
}

export default Logout;

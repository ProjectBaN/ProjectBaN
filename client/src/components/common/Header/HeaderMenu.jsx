import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/nail">Nail</Link>
      <Link to="/">Home</Link>
    </div>
  );
}

export default HeaderMenu;

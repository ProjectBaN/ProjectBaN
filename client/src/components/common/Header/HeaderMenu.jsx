import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  // const navbar = styled.nav `
  //   text
  // `
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/nail">Nail</Link>
    </div>
  );
}

export default HeaderMenu;

import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  // const navbar = styled.nav `
  //   text
  // `
  return (
    <div>
      <Link to="/">
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link to="/nail">
        <i className="fa-regular fa-user"></i>
      </Link>
    </div>
  );
}

export default HeaderMenu;

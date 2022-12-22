import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButtonIcons() {
  return (
    <div>
      <Link to="/shoppingcart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link to="/mypage">
        <i className="fa-regular fa-user"></i>
      </Link>
    </div>
  );
}

export default HeaderButtonIcons;

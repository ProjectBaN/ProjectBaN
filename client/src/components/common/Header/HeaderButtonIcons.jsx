import React from 'react';
import { Link } from 'react-router-dom';

function HeaderButtonIcons() {
  return (
    <div className="flex flex-row   gap-MbMedium ">
      <Link to="/shoppingcart">
        <i className="fas fa-shopping-cart fa-xl"></i>
      </Link>
      <Link to="/mypage">
        <i className="fa-regular fa-user fa-xl"></i>
      </Link>
    </div>
  );
}

export default HeaderButtonIcons;

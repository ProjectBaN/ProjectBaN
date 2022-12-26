import React from 'react';
import { Link } from 'react-router-dom';

function HeaderCategoryMenu() {
  return (
    <Link to="/category" className="font-subtitle">
      <i className="text-3xl fas fa-bars "></i>
      <span className="text-xl font-bold">카테고리</span>
    </Link>
  );
}

export default HeaderCategoryMenu;

import React from 'react';
import { Link } from 'react-router-dom';

function HeaderCategoryMenu() {
  return (
    <div className="text-xl">
      <Link to="/category">
        <i className="fas fa-bars mr-2"></i>
        <span>카테고리</span>
      </Link>
    </div>
  );
}

export default HeaderCategoryMenu;

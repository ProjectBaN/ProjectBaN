import React from 'react';
import { Link } from 'react-router-dom';

function HeaderCategoryMenu() {
  return (
    <div className="w-80 flex gap-2 justify-start items-center text-xl m-auto">
      <Link to="/category">
        <i className="fas fa-bars mr-2"></i>
        <span>카테고리</span>
      </Link>
    </div>
  );
}

export default HeaderCategoryMenu;

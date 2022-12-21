import React from 'react';
import { Link } from 'react-router-dom';

function HeaderCategoryMenu() {
  return (
    <div>
      <Link to="/category">
        <i className="fas fa-bars"></i>
      </Link>
    </div>
  );
}

export default HeaderCategoryMenu;

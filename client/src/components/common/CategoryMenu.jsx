import React from 'react';
import { Link } from 'react-router-dom';

function CategoryMenu() {
  return (
    <div>
      <Link to="/category">
        <i className="fas fa-bars"></i>
      </Link>
    </div>
  );
}

export default CategoryMenu;

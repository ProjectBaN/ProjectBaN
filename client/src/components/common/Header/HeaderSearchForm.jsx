import React from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  return (
    <div>
      <input type="text" className="w-64 h-8" />
      <Link to="/">
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;

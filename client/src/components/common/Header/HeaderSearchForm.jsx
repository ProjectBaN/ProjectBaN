import React from 'react';
import { Link } from 'react-router-dom';
function HeaderSearchForm() {
  return (
    <div>
      <Link to="/">
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </Link>
    </div>
  );
}

export default HeaderSearchForm;

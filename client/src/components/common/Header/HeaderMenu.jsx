import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div className="flex flex-row font-contents font-bold gap-MbSm ">
      <Link to="/" className="">
        네일
      </Link>
      <Link to="/" className="">
        페디
      </Link>
      <Link to="/" className="">
        큐티클
      </Link>
      <Link to="/" className="">
        스티커
      </Link>
    </div>
  );
}

export default HeaderMenu;

import React from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div className="flex gap-2 text-base ">
      <Link to="/">네일</Link>
      <Link to="/">페디</Link>
      <Link to="/">큐티클</Link>
      <Link to="/">스티커</Link>
    </div>
  );
}

export default HeaderMenu;

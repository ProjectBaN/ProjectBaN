import React from 'react';
import { Link } from 'react-router-dom';

function CategoryMenuNav() {
  return (
    <div className="w-full flex flex-col font-contents font-bold">
      <Link to="/" className="pl-MbMedium h-MbBase flex items-center hover:bg-gray-200 text-lg">
        네일
      </Link>
      <Link to="/" className="pl-MbMedium h-MbBase flex items-center  hover:bg-gray-200 text-lg">
        페디
      </Link>
      <Link to="/" className="pl-MbMedium h-MbBase flex items-center  hover:bg-gray-200 text-lg">
        큐티클
      </Link>
      <Link to="/" className="pl-MbMedium h-MbBase flex items-center  hover:bg-gray-200 text-lg">
        스티커
      </Link>
    </div>
  );
}

export default CategoryMenuNav;

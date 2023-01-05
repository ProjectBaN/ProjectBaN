import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function HeaderMenu() {
  return (
    <div className="flex flex-row items-center font-contents font-bold ">
      <li className="relative px-2">
        {/* after로 바꾸기 contents tailwind 확인 */}
        <NavLink
          to=""
          className={({ isActive }) =>
            'after:content-[""] after:border-solid after:border-b-2 after:border-black after:absolute after:left-0 after:top-2  after:w-full after:h-full  lg:after:contents'
          }
        >
          홈
        </NavLink>
      </li>
      <li className="px-2">
        <Link to="/" className="">
          네일
        </Link>
      </li>
      <li className="px-2">
        <Link to="/" className="">
          페디
        </Link>
      </li>
      <li className="px-2">
        <Link to="/" className="">
          큐티클
        </Link>
      </li>
      <li className="px-2">
        <Link to="/" className="">
          스티커
        </Link>
      </li>
    </div>
  );
}

export default HeaderMenu;

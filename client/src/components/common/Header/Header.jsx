import React from 'react';

import HeaderButtonIcons from './HeaderButtonIcons';
import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderSearchForm from './HeaderSearchForm';

function Header() {
  return (
    <div className="w-pcContainer m-auto bg-red-300">
      <div className="flex justify-center items-center ">
        <HeaderHomeLogo />
        <HeaderSearchForm />
      </div>
    </div>
  );
}

export default Header;

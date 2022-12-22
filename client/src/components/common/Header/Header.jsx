import React from 'react';

import HeaderButtonIcons from './HeaderButtonIcons';
import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderSearchForm from './HeaderSearchForm';

function Header() {
  return (
    <div>
      <HeaderCategoryMenu />
      <HeaderHomeLogo />
      <HeaderButtonIcons />
      <HeaderSearchForm />
    </div>
  );
}

export default Header;

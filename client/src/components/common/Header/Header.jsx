import React from 'react';
import styled from 'styled-components';
import HeaderButtonIcons from './HeaderButtonIcons';
import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderCategoryMenu from './HeaderCategoryMenu';

function Header() {
  const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
  `;
  return (
    <div>
      <HeaderContainer>
        <HeaderCategoryMenu />
        <HeaderHomeLogo />
        <HeaderButtonIcons />
      </HeaderContainer>
    </div>
  );
}

export default Header;

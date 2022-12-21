import React from 'react';
import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import HeaderHomeLogo from './HeaderHomeLogo';
import CategoryMenu from './HeaderCategoryMenu';

function Header() {
  const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
  `;
  return (
    <div>
      <HeaderContainer>
        <CategoryMenu />
        <HeaderHomeLogo />
        <HeaderMenu />
      </HeaderContainer>
    </div>
  );
}

export default Header;

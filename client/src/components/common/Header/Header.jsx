import React from 'react';
import styled from 'styled-components';

import HeaderButtonIcons from './HeaderButtonIcons';
import HeaderHomeLogo from './HeaderHomeLogo';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import HeaderSearchForm from './HeaderSearchForm';

const HeaderContainer = styled.header`
  width: 100%;
`;
const HeaderButtonsWrapper = styled.div`
  display: flex;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderButtonsWrapper>
        <HeaderCategoryMenu />
        <HeaderHomeLogo />
        <HeaderButtonIcons />
      </HeaderButtonsWrapper>
      <HeaderSearchForm />
    </HeaderContainer>
  );
}

export default Header;

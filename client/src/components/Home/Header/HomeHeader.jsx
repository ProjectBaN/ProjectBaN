import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header/Header';
import HeaderEventBanner from '../../common/Header/HeaderEventBanner';
import HeaderHomeLogo from '../../common/Header/HeaderHomeLogo';
function HomeHeader() {
  const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
  `;
  return (
    <div>
      <HeaderEventBanner />
      <HeaderContainer>
        <HeaderHomeLogo />
        <Header />
      </HeaderContainer>
    </div>
  );
}

export default HomeHeader;

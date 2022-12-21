import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const ButtonIconsContainer = styled.div``;
function HeaderButtonIcons() {
  return (
    <ButtonIconsContainer>
      <Link to="/shoppingcart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <Link to="/mypage">
        <i className="fa-regular fa-user"></i>
      </Link>
    </ButtonIconsContainer>
  );
}

export default HeaderButtonIcons;

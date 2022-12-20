import React from 'react';
import styled from 'styled-components';
import { theme } from './../../../styles/theme';

function HeaderHomeLogo() {
  const HomeLogo = styled.div`
    display: flex;
    font-size: ${theme.fontSize.lg};
  `;

  return <HomeLogo>baroNail</HomeLogo>;
}
export default HeaderHomeLogo;

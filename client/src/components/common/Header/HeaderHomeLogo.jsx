import React from 'react';
import styled from 'styled-components';
import { theme } from './../../../styles/theme';

const HomeLogo = styled.div`
  display: flex;
  font-size: ${theme.fontSize.lg};
`;
function HeaderHomeLogo() {
  return <HomeLogo>baroNail</HomeLogo>;
}
export default HeaderHomeLogo;

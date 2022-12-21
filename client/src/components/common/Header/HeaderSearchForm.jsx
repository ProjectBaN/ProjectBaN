import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SearchContainer = styled.div`
  margin-left: ${theme.spacing.m};
  margin-right: ${theme.spacing.m};
  width: calc(100% - 40px);
  background-color: #f9f7f3;
  border-bottom: 1px solid black;
`;
const SearchForm = styled.input`
  width: 80%;
  padding: 0;
  height: 40px;
  border: 0;
  background: none;
`;

const SearchSubmitButton = styled(Link)`
  margin-left: 12px;
  background: none;
  border: 0;
`;
function HeaderSearchForm() {
  return (
    <SearchContainer>
      <SearchForm />
      <SearchSubmitButton to="/">
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
      </SearchSubmitButton>
    </SearchContainer>
  );
}

export default HeaderSearchForm;

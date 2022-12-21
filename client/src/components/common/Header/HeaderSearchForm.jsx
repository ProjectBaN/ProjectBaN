import React from 'react';
import styled from 'styled-components';

function HeaderSearchForm() {
  const SearchContainer = styled.div`
    width: 100%;
    background-color: gray;
  `;
  const SearchForm = styled.input`
    width: 60%;
    height: 40px;
    border: 0;
  `;
  return (
    <SearchContainer>
      <SearchForm />
    </SearchContainer>
  );
}

export default HeaderSearchForm;

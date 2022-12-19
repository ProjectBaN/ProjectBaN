import React from 'react';
import './App.css';
import styled from 'styled-components';
import { theme } from './styles/theme';

function App() {
  const TestSize = styled.div`
    background-color: red;

    @media ${({ theme }) => theme.device.tablet} {
      background-color: blue;
    }
    @media ${({ theme }) => theme.device.laptop} {
      background-color: yellow;
    }
    @media ${({ theme }) => theme.device.desktop} {
      background-color: green;
    }
  `;

  return (
    <div className="App">
      <TestSize>dsada</TestSize>
    </div>
  );
}

export default App;

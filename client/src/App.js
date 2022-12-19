import './App.css';
import { Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

function App() {
  const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 4px;
    color: ${(props) => props.theme.main};
    border: 2px solid ${(props) => props.theme.main};
  `;
  Button.defaultProps = {
    theme: {
      main: 'palevioletred',
    },
  };

  const theme = {
    main: 'mediumseagreen',
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>라우터 테스트</h1>} />
      </Routes>
      <Button>버튼2</Button>
      <ThemeProvider theme={theme}>
        <Button>버튼1</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;

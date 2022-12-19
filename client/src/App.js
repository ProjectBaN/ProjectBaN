import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>라우터 테스트</h1>} />
      </Routes>
    </div>
  );
}

export default App;

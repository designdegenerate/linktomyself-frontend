import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

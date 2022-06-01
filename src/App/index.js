import './styles/style.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Page from '../pages/Page';
import PrivacyPage from '../pages/Privacy';
import SignupPage from '../pages/Signup';
import WidgetFactory from '../components/WidgetFactory';
import NavBar from '../components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        {/*"static" pages*/}
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/privacy" element={<PrivacyPage/>}></Route>

        {/*Auth pages*/}
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignupPage/>}></Route>

        {/*User Pages*/}
        <Route path="/p/:username" element={<Page/>}></Route>
        <Route path="/p/:username/edit" element={<Page/>}></Route>
      </Routes>
      <WidgetFactory/>
    </div>
  );
}

export default App;
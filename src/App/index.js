import './style.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../store/user/selectors';

import NavBar from '../components/NavBar';
import HomePage from '../pages/HomePage';
import PrivacyPage from '../pages/Privacy';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Page from '../pages/Page';
import Footer from '../components/Footer';

function App() {
  const userProfile = useSelector(selectUserProfile);
  return (
    <div className="App">

      {
        userProfile ? <NavBar/> : <></>
      }

      <Routes>
        {/*"static" pages*/}
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/privacy" element={<PrivacyPage/>}></Route>

        {/*Auth pages*/}
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<RegisterPage/>}></Route>

        {/*User Pages*/}
        <Route path="/p/:username" element={<Page/>}></Route>
        <Route path="/p/:username/edit" element={<Page/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
import './style.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PrivacyPage from '../pages/Privacy';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Page from '../pages/Page';
import { Toaster } from 'react-hot-toast';
import NotFound from '../components/NotFound';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreLogin } from '../store/user/actions';

function App() {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(restoreLogin());
  }, [])

  return (
    <div className="App">
      <Toaster/>
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
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
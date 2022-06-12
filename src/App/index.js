import "./style.scss";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreLogin } from "../store/user/actions";
import HomePage from "../pages/HomePage";
import PrivacyPage from "../pages/Privacy";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Page from "../pages/Page";
import SettingsPage from "../pages/EditPage/SettingsPage";
import EditLinksPage from "../pages/EditPage/EditLinksPage";
import EditSectionsPage from "../pages/EditPage/EditSectionsPage";
import NotFound from "../components/NotFound";
import EditPage from "../pages/EditPage";
import ChangePasswordPage from "../pages/EditPage/ChangePasswordPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid var(--fg-color)',
            padding: '0.5rem',
            color: 'var(--fg-color)',
            backgroundColor: 'var(--bg-color)'
          },
        }}
      />
      <Routes>
        {/*"static" pages*/}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/privacy" element={<PrivacyPage />}></Route>

        {/*Auth pages*/}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<RegisterPage />}></Route>

        {/*User Pages*/}
        <Route path="/p/:username" element={<Page />}></Route>

        {/*Settings/Editing Pages*/}
        <Route path="/u" element={<EditPage />}>
          <Route 
          path="settings"
          element={<SettingsPage />}
          ></Route>
          <Route
            path="edit-links"
            element={<EditLinksPage />}
          ></Route>
          <Route
            path="edit-sections"
            element={<EditSectionsPage />}
          ></Route>
          <Route
            path="change-password"
            element={<ChangePasswordPage />}
          ></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;

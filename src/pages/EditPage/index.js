import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";
import { selectUserPage, selectUserProfile } from "../../store/user/selectors";
import "./style.scss";

export default function EditPage() {
  const getUser = useSelector(selectUserProfile);
  const getPage = useSelector(selectUserPage);

  return !getUser ? (
    <NotFound />
  ) : (
    <main
    className="edit-pages"
      style={
        getPage.colors
          ? {
              "--lightFG": getPage.colors.light.lightFG,
              "--lightBG": getPage.colors.light.lightBG,
              "--darkFG": getPage.colors.dark.darkFG,
              "--darkBG": getPage.colors.dark.darkBG,
            }
          : {}
      }
    >
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

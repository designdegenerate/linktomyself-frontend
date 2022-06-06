import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPage } from "../../store/page/actions";
import { selectNotfound, selectPage } from "../../store/page/selectors";
import Sidebar from "./components/Sidebar";
import Content from "./components/content";
import { selectUserProfile } from "../../store/user/selectors";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import NotFound from "../../components/NotFound";

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();
  const getPage = useSelector(selectPage);
  const getUser = useSelector(selectUserProfile);
  const isNotFound = useSelector(selectNotfound);

  useEffect(() => {
    dispatch(fetchPage(params.username));
  }, [dispatch, params.username]);

  return isNotFound ?
  <NotFound/>
  :
  !getPage ? (
    <div className="loading-screen">
      <p>loading...</p>
    </div>
  ) : (
    <main
      style={
        getPage
          ? {
              "--lightFG": getPage.colors.lightFG,
              "--lightBG": getPage.colors.lightBG,
              "--darkFG": getPage.colors.darkFG,
              "--darkBG": getPage.colors.darkBG,
            }
          : {}
      }
    >
      {getUser ? <NavBar /> : <></>}
      <div className="page">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </main>
  );
}

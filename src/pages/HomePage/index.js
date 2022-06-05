import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { selectUserProfile } from "../../store/user/selectors";
import MenuBar from "./components/MenuBar";
import "./style.scss";

export default function HomePage() {
  const getUser = useSelector(selectUserProfile);
  return (
    <main className="homepage">
      {getUser ? <NavBar/> : <MenuBar />}
      <article>
        <h1>homepage</h1>
      </article>
      <Footer/>
    </main>
  );
}
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { selectUserProfile } from "../../store/user/selectors";
import MenuBar from "../HomePage/components/MenuBar";
import "./style.scss";

export default function TOSPage() {
  const getUser = useSelector(selectUserProfile);
  return (
    <main>
      {getUser ? <NavBar /> : <MenuBar />}
      <article className="privacy-tos">
        <h1>Terms of Service</h1>
        <p>Last Updated on: ()</p>
        <p>Insert here</p>
      </article>
      <Footer />
    </main>
  );
}

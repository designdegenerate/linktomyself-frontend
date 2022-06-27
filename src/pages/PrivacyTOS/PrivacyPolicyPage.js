import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { selectUserProfile } from "../../store/user/selectors";
import MenuBar from "../HomePage/components/MenuBar";
import "./style.scss";

export default function PrivacyPolicyPage() {
  const getUser = useSelector(selectUserProfile);
  return (
    <main>
      {getUser ? <NavBar /> : <MenuBar />}
      <article className="privacy-tos">
        <h1>Privacy Policy</h1>
        <p>Last Updated on: ()</p>
        <p>Insert here</p>
        <p>As of 27 June, 2022, we have never received a National Security Letter, FISA order, or any other classified request for user information.</p>
      </article>
      <Footer />
    </main>
  );
}

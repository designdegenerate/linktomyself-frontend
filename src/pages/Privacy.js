import { useSelector } from "react-redux"
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { selectUserProfile } from "../store/user/selectors"
import MenuBar from "./HomePage/components/MenuBar";

export default function PrivacyPage() {
  const getUser = useSelector(selectUserProfile);
  return (
    <main>
      {getUser ? <NavBar/> : <MenuBar />}
      <h1>PrivacyPage</h1>
      <Footer/>
    </main>
  )
}
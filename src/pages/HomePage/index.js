import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { selectUserProfile } from "../../store/user/selectors";
import MenuBar from "./components/MenuBar";
import "./style.scss";
import homeImage from "../../images/linktomyself-home.png";
import homeImageDark from "../../images/linktomyself-home-dark.png";
import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    document.title = "Home — Linktomyself";
  }, [])

  const getUser = useSelector(selectUserProfile);
  return (
    <main className="homepage">
      {getUser ? <NavBar /> : <MenuBar />}
      <article>
        <div className="header">
          <picture>
            <source
              srcSet={homeImageDark}
              media="(prefers-color-scheme: dark)"
              type="image/png"
            ></source>
            <img src={homeImage} alt="" type="image/png"></img>
          </picture>
          <h1>
            Your uncomplicated personal homepage in a <br></br>decentralized
            world
          </h1>
          <div>
            <Link to="/p/laurensspangenberg" className="button-border" target="_blank">
              View Mine
            </Link>
            <Link to="/signup" className="button-filled">
              Create yours
            </Link>
          </div>
        </div>
        <div className="subtitle">
          <p>
            <strong>Because a personal homepage is a public profile</strong>.
            Most website builders are focused on structure with ugly,
            complicated, and bloated defaults. We keep it simple: tell a bit
            about yourself, show off your links to relevant places, show a
            selection of favourite things with an optional list to a full
            collection, and choose a colour scheme (with dark mode support).
            What more do you really need?
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}

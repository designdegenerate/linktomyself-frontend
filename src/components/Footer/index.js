import { Link } from "react-router-dom";
import "./style.scss";

export default function Footer() {
  return (
    <footer>
      <p>Linktomyself by © 2022 Laurens Spangenberg</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/privacypolicy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/tos">Terms of Service</Link>
        </li>
      </ul>
    </footer>
  );
}

import { Link } from "react-router-dom";
import "./style.scss";

export default function Footer() {
  return (
    <footer>
      <p>Linktomyself © 2022 Laurens Spangenberg</p>
      <ul>
        <li>
          <Link to="/">Linktomyself Home</Link>
        </li>
        <li>
          <Link to="/privacy">Privacy Policy</Link>
        </li>
      </ul>
    </footer>
  );
}

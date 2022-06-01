import { Link } from "react-router-dom";
import './style.scss';

export default function Footer() {
  return (
    <footer>
      <p>Created using <Link to="/">Linktomyself</Link></p>
      <p>Linktomyself © 2022 Laurens Spangenberg</p>
    </footer>
  )
}
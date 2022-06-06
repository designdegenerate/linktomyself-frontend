import { Link } from "react-router-dom";
import "./style.scss";

export default function NotFound() {
  return (
    <div className="notFound">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">return home</Link>
    </div>
  );
}

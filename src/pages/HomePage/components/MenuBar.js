import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <div className="menubar">
      <Link to="/">Linktomyself</Link>
      <div>
        <Link className="button-border" to="/login">
          login
        </Link>
        <Link className="button-filled" to="/signup">
          signup
        </Link>
      </div>
    </div>
  );
}

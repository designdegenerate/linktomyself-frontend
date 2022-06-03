import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
    <div className="menubar">
      <p>Linktomyself</p>
      <div>
      <Link className="button-border" to="/login">login</Link>
      <Link className="button-border" to="/signup">signup</Link>
      </div>
    </div>
  )
}
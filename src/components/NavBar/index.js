import { Link } from "react-router-dom";
import "./style.scss";
export default function NavBar() {
  //Only shows up if user is logged in
  //TODO: build an enclosure menu
  return (
    <nav>
      <ul>
        <li>
          <p>Username</p>
        </li>
        <li>
          <details className="menu">
            <summary>Menu</summary>
            <div class="menu-inner">
              <ul>
                <li>Profile Settings</li>
                <li>Edit Links</li>
                <li>Edit Sections</li>
                <li>Logout</li>
              </ul>
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
}

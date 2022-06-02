import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserProfile } from "../../store/user/selectors";
import "./style.scss";
export default function NavBar() {
  const user = useSelector(selectUserProfile);
  return (
    <nav>
      <ul>
        <li>
          <p>{user.name}</p>
        </li>
        <li>
          <details className="menu">
            <summary>Menu</summary>
            <div className="menu-inner">
              <ul>
                <li>
                  <Link to={`/p/${user.username}`}>My Homepage</Link>
                </li>
                <li>
                  <Link to={`/p/${user.username}/settings`}>Profile Settings</Link>
                </li>
                <li>
                  <Link to={`/p/${user.username}/edit-links`}>Edit Links</Link>
                </li>
                <li>
                  <Link to={`/p/${user.username}/edit-sections`}>Edit Sections</Link>
                </li>
                <li>
                  <Link to="/">Log Out</Link>
                </li>
              </ul>
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
}

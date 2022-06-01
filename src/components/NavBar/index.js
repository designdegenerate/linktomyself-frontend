import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserPage, selectUserProfile } from "../../store/user/selectors";
import "./style.scss";
export default function NavBar() {
  const user = useSelector(selectUserProfile);
  const page = useSelector(selectUserPage);
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
                  <Link to="/">Profile Settings</Link>
                </li>
                <li>
                  <Link to="/">Edit Links</Link>
                </li>
                <li>
                  <Link to="/">Edit Sections</Link>
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

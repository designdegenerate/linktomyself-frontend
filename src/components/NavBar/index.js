import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";
import "./style.scss";
export default function NavBar() {
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <p>logged in as: <strong>{user.name}</strong></p>
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
                  <Link to={`/u/settings`}>Profile Settings</Link>
                </li>
                <li>
                  <Link to={`/u/edit-links`}>Edit My Links</Link>
                </li>
                <li>
                  <Link to={`/u/edit-sections`}>Edit My Sections</Link>
                </li>
                <li>
                  <button onClick={
                    () => {
                      dispatch(logoutUser())
                      if(
                        location.pathname === `/p/${user.username}/settings` ||
                        location.pathname === `/p/${user.username}/edit-links` ||
                        location.pathname === `/p/${user.username}/edit-sections`
                        ) {
                          navigate(`/p/${user.username}`)
                        }
                    }
                  }>Log Out</button>
                </li>
              </ul>
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
}

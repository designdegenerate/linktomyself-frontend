import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/user/actions";
import { selectUserPage, selectUserProfile } from "../../store/user/selectors";
import "./style.scss";
export default function NavBar() {
  const user = useSelector(selectUserProfile);
  const page = useSelector(selectUserPage);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => { console.log(location)}}>log</button>
      <ul>
        <li>
          <Link to={`/p/${user.username}`}>
            <h1>Linktomyself</h1>
            </Link>
        </li>
        <li>
          <details className="menu">
            <summary>
              <img src={page.profileImage} alt=""></img>
              {user.name}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </summary>
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
                  <button
                    onClick={() => {
                      dispatch(logoutUser());
                      if (
                        location.pathname === "/u/settings" ||
                        location.pathname ===
                          "/u/edit-links" ||
                        location.pathname ===
                          "/u/edit-sections"
                      ) {
                        navigate(`/p/${user.username}`);
                      }
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </details>
        </li>
      </ul>
    </nav>
  );
}

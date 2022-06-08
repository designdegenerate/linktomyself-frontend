import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPage } from "../../../../store/page/selectors";
import { selectUserProfile } from "../../../../store/user/selectors";

export default function NoContent() {
  const getUser = useSelector(selectUserProfile);
  const getPage = useSelector(selectPage);
  const params = useParams();

  return (
    <>
      {getUser && getUser?.username === params.username ? (
        <div className="no-content">
          {getPage.permaLinks.length === 0 ? (
              <Link className="button-border" to="/u/edit-profile">
                Add some links
              </Link>
          ) : (
            <></>
          )}
          {!getPage.bio ? (
            <Link className="button-border" to="/u/edit-profile">
              Edit your profile
            </Link>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPage } from "../../../../store/page/selectors";
import { selectUserProfile } from "../../../../store/user/selectors";
import Section from "./Section";
import "./style.scss";

export default function Content() {
  const getPage = useSelector(selectPage);
  const getUser = useSelector(selectUserProfile);
  const params = useParams();

  return (
    <article className="content">
      {!getPage.oneLiner &&
      !getPage.bio &&
      getPage.sections.length === 0 &&
      getUser?.username === params.username ? (
        <div className="no-content">
          <div>
            <h2>It's so quiet here, add some content!</h2>
            <Link to="/u/edit-sections">Edit Sections</Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="oneliner">{getPage.oneLiner}</h2>
          <p className="bio">{getPage.bio}</p>
          {getPage.sections.map((sect) => {
            return <Section data={sect} />;
          })}
        </>
      )}
    </article>
  );
}

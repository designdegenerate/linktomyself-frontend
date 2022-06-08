import { useSelector } from "react-redux";
import { selectPage } from "../../../../store/page/selectors";
import { selectUserProfile } from "../../../../store/user/selectors";
import Section from "./Section";

export default function Content() {
  const getPage = useSelector(selectPage);
  const getUser = useSelector(selectUserProfile);

  return (
    <article className="content">
      {
        !getPage.oneLiner && !getPage.bio && getPage.sections.length === 0 && getUser ?
        <div className="noContent">
          <h1>It's so empty here, add some content!</h1>
        </div>
        :

        (
          <>
          <h2 className="oneliner">{getPage.oneLiner}</h2>
          <p className="bio">{getPage.bio}</p>
          {
            getPage.sections.map( sect => {
              return (
                <Section data={sect}/>
              )
            })
          }
          </>

        )
      }

    </article>
  );
}
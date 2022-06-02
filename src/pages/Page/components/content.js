import { useSelector } from "react-redux";
import { selectPage } from "../../../store/page/selectors";
import Section from "./section";

export default function Content() {
  const getPage = useSelector(selectPage);

  return (
    <article className="content">
      <h2 className="oneliner">{getPage.oneLiner}</h2>
      <p className="bio">{getPage.bio}</p>
      {
        getPage.sections.map( sect => {
          return (
            <Section data={sect}/>
          )
        })
      }
    </article>
  );
}
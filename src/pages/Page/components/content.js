import { useSelector } from "react-redux";
import { selectPage } from "../../../store/page/selectors";

export default function Content() {
  const getPage = useSelector(selectPage);
  return (
    <article className="content">
      <h2>{getPage.oneLiner}</h2>
      <section>
        <h3>Favourite Food</h3>
        <ul>
          <li>cheese</li>
          <li>kroket</li>
          <li>tacos</li>
        </ul>
      </section>
    </article>
  );
}

import { useSelector } from "react-redux";
import { selectPage } from "../../../../store/page/selectors";
import "./style.scss";

export default function LinkCollection() {
  const getPage = useSelector(selectPage);

  return (
      <ul className="link-collection">
        {
          getPage.permaLinks.map(link => {
            return (
              <li key={link._id}>
                <a className="link-button" href={link.link}>{link.text}</a>
              </li>
            )
          })
        }
      </ul>
  );
}

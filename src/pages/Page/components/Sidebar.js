import { useSelector } from "react-redux";
import { selectPage } from "../../../store/page/selectors";
import LinkCollection from "./LinkCollection";

export default function Sidebar() {

  const getPage = useSelector(selectPage);
  return (
    <div className="sidebar">
      <h1>{getPage.user.name}</h1>
      <LinkCollection/>
      <p>{getPage.bio}</p>
    </div>
  );
}

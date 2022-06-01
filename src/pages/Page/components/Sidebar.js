import { useSelector } from "react-redux";
import { selectPage } from "../../../store/page/selectors";
import LinkCollection from "./LinkCollection";

export default function Sidebar() {

  const getPage = useSelector(selectPage);
  return (
    <div className="sidebar">
      <h1>{getPage.user.name}</h1>
      <h2>My Links</h2>
      <LinkCollection/>
      <p className="bio">{getPage.bio}</p>
    </div>
  );
}

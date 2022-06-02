import { useSelector } from "react-redux";
import { selectPage } from "../../../store/page/selectors";
import LinkCollection from "./LinkCollection";

export default function Sidebar() {
  const getPage = useSelector(selectPage);
  return (
    <div className="sidebar">
      <h1>{getPage.user.name}</h1>
      <h2 className="oneliner">{getPage.oneLiner}</h2>
      <h2 className="header-med mylinks">My Links</h2>
      <LinkCollection />
      <div className="bio">
        <h2 className="header-med">About me</h2>
        <p className="bio">{getPage.bio}</p>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { selectPage } from "../../../../store/page/selectors";
import LinkCollection from "./LinkCollection";
import './style.scss';

export default function Sidebar() {
  const getPage = useSelector(selectPage);
  return (
    <div className="sidebar">
      <div className="profile-wrapper">
        <div
        className="profile-image"
        style={{backgroundImage: `url(${getPage.profileImage})`}}
        ></div>
        <div>
          <h1>{getPage.user.name}</h1>
          <h2 className="oneliner">{getPage.oneLiner}</h2>
        </div>
      </div>
      <div className="link-bio-wrapper">
        <div>
          <h2 className="header-med mylinks">My Links</h2>
          <LinkCollection />
        </div>
        <div className="bio">
          <h2 className="header-med">About me</h2>
          <p>{getPage.bio}</p>
        </div>
      </div>
    </div>
  );
}

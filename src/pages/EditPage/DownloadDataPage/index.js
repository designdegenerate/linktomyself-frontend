import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forceRefetchData } from "../../../store/user/actions";
import {
  selectUserPage,
  selectUserProfile,
} from "../../../store/user/selectors";
import "./style.scss";

export default function DownloadDataPage() {
  const [getDownload, setDownload] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector(selectUserPage);
  const profile = useSelector(selectUserProfile);

  /*
  - Download files as JSON
  - Download profile pic
  - Map over other photos
  - If photos are too large, 
  */

  const downloadData = () => {
    setDownload(true);
    dispatch(forceRefetchData());
    const jsonVariable = JSON.stringify(req.user);
    // var path_tmp = create_tmp_file(jsonVariable);
    // res.download(path_tmp);
  };

  // const cancelData

  useEffect(() => {
    document.title = "Download Your Data — Linktomyself";
  }, []);

  return (
    <article className="download-data">
      <Link className="button-filled" to="/u/settings">
        Back to Profile Settings
      </Link>
      <h1>Download Your Data</h1>
      <ul>
        <li>
          This will be a zip file. Depending on the size of your content, this
          may be split into multiple zip files.
        </li>
        <li>
          Most of your data will be stored as a JSON file, containing: your
          name, username, email, bio, summary, links, and sections.
        </li>
        <li>
          All your current profile picture and all your pictures contained
          inside sections will be attached. Older pictures will not be
          downloaded as we do not store them.
        </li>
        <li>
          This might take a while as the browser downloads the data from the
          server and zips it.
        </li>
        <li>
          <strong>Closing the page will cancel the download.</strong>
        </li>
      </ul>
      <button
        className="button-border"
        onClick={() => {
          downloadData();
        }}
      >
        Download Data
      </button>

      {getDownload ? (
        <div className="console">
          <h2>Status</h2>
          <ul>
            <li>Starting download…</li>
          </ul>
          <button className="button-filled">Cancel Data Download</button>
        </div>
      ) : (
        <></>
      )}
    </article>
  );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forceRefetchData } from "../../../store/user/actions";
import {
  selectUserPage,
  selectUserProfile,
} from "../../../store/user/selectors";
import "./style.scss";
import { saveAs } from "file-saver";
import axios from "axios";
const JSZip = require("jszip");

export default function DownloadDataPage() {
  const [getDownload, setDownload] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector(selectUserPage);
  const profile = useSelector(selectUserProfile);
  const zip = new JSZip();

  /*
  - Download files as JSON
  - Download profile pic
  - Map over other photos
  - If photos are too large, 
  */

  const downloadData = async () => {
    setDownload(true);
    dispatch(forceRefetchData());

    // First Download json data
    zip.file("linktomyself_data/user_page.json", JSON.stringify(page));
    zip.file("linktomyself_data/user_profile.json", JSON.stringify(profile));

    //Fetch profile picture, it it exists
    if (page.profileImage) {
      const filename = page.profileImage.link.substr(page.profileImage.link.lastIndexOf('/') + 1);

      const profileImage = await axios.get(page.profileImage.link, { responseType: 'blob' });
      
      zip.file(`linktomyself_data/${filename}`, profileImage.data);
    }

    //Download 1
    zip.generateAsync({ type: "blob" }).then(function (blob) {
      saveAs(blob, "linktomyself_data.zip");
    });

    //logic
    //map over sect
    //add image
    //count file size
    //if file size is under, keep going
    //else, zip the file
    // then, start a new file
    //loop

    //Now map over data
    // page.sections.map( async(sect) => {
    //   await sect.content.map( async(card) => {
    //     if (card.image) {
    //       const filename = card.image.substr(card.image.lastIndexOf('/') + 1);

    //       const picture = await axios.get(card.image, { responseType: 'blob' });

    //       zip.file(`linktomyself_content/${filename}`, picture.data)
          
    //     }

    //   })

      await Promise.all(page.sections.map(
        sect => {
          return sect.content.map(
            card => {
              return axios.get(card.image, { responseType: 'blob' });
            }
          )
        }
      )).then(image => {
        console.log(image);
    })

    //todo: figure out promise, make it download to a new zip file and mark the other thingy as just a bug

      /*
      export function FetchGalleries( galleries_ids ) {

    return function (dispatch) {
        return Promise.all(galleries_ids.map( (record, index) => {
            return axios.get('https://e.dgyd.com.ar/wp-json/wp/v2/media?_embed&parent='+record.id);
        })).then(galleries => {
            dispatch({ type: FETCH_GALLERIES_SUCCESS, payload: galleries });
        });
    }
    */

    //   )
    // })

    // zip.generateAsync({ type: "blob" }).then(function (blob) {
    //   saveAs(blob, "linktomyself_content.zip");
    // });

    //

    //Add loading bar thingie
    //add warning when page is left

    setDownload(false);
  };

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
      {!getDownload ? (
        <button
          className="button-border"
          onClick={() => {
            downloadData();
          }}
        >
          Download Data
        </button>
      ) : (
        <></>
      )}
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

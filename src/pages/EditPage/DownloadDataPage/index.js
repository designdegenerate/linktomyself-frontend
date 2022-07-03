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
import { ZipWriter, BlobReader, TextReader, BlobWriter, terminateWorkers} from "@zip.js/zip.js";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";

export default function DownloadDataPage() {
  const [getDownload, setDownload] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector(selectUserPage);
  const profile = useSelector(selectUserProfile);

  const downloadData = async () => {
    setDownload(true);
    dispatch(forceRefetchData());

    const blobWriter = new BlobWriter("application/zip");
    const zipWriter = new ZipWriter(blobWriter);

    // First Download json data
    await zipWriter.add("user_page.json", new TextReader(JSON.stringify(page)));
    await zipWriter.add("user_profile.json", new TextReader(JSON.stringify(profile)));

    //Fetch profile picture, it it exists
    if (page.profileImage) {
      const filename = page.profileImage.link.substr(
        page.profileImage.link.lastIndexOf("/") + 1
      );

      const profileImage = await axios.get(page.profileImage.link, {
        responseType: "blob",
      });

      await zipWriter.add(filename, new BlobReader(profileImage.data));

    }

    //Download 1
    const dataBlob = URL.createObjectURL(await zipWriter.close());
    saveAs(dataBlob, "linktomyself_data.zip");
    URL.revokeObjectURL(dataBlob);
    terminateWorkers();

    const imageLinks = [];

    //Gather all links first
    page.sections.map((sect) => {
      sect.content.map((card) => {
        if (card.image) {
          imageLinks.push(card.image);
        }
      });
    });

    const imageBlobWriter = new BlobWriter("application/zip");
    const imageZipWriter = new ZipWriter(imageBlobWriter);

    // Using for loop to allow for aync operation
    for (const index in imageLinks) {
      const filename = imageLinks[index].substr(
        imageLinks[index].lastIndexOf("/") + 1
      );

      const picture = await axios.get(imageLinks[index], { responseType: 'blob' });

      await imageZipWriter.add(filename, new BlobReader(picture.data));
    }

    // Download the rest of the data
    const contentBlob = URL.createObjectURL(await imageZipWriter.close());
    saveAs(contentBlob, "linktomyself_content.zip");
    URL.revokeObjectURL(contentBlob);
    terminateWorkers();

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
      <h1>Download Your Data (Alpha)</h1>
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
        <li>If you have too many pictures, the download might fail.</li>
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
        <LoadingButton/>
      )}
    </article>
  );
}

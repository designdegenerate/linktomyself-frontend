import { useSelector } from "react-redux";
import { selectUserPage } from "../../../store/user/selectors";
import "./style.scss";
import EditLinkForm from "./EditLinkForm";
import AddLinkForm from "./AddLinkForm";
import { useEffect } from "react";

export default function EditLinksPage() {
  const userPage = useSelector(selectUserPage);
  const { permaLinks } = userPage;

  useEffect(() => {
    document.title = "Edit Links — Linktomyself";
  })

  return (
    <article className="edit-links">
      <h1>Edit Links</h1>
      <div>
        {permaLinks.map((link) => {
          return (
            <EditLinkForm
              key={link._id}
              id={link._id}
              text={link.text}
              link={link.link}
            />
          );
        })}
        <AddLinkForm />
      </div>
    </article>
  );
}

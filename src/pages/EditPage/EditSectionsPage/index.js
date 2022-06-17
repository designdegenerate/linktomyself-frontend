import { useSelector } from "react-redux";
import { selectUserPage } from "../../../store/user/selectors";
import CreateSectionForm from "./components/CreateSectionForm";
import EditSectionForm from "./components/EditSectionForm";
import "./style.scss";

export default function EditSectionsPage() {
  const userPage = useSelector(selectUserPage);
  const { sections } = userPage;

  return (
    <article className="edit-sections">
      <h1>Edit Sections</h1>
      <div className="section-container">
        {sections.map( sect => {
          return <EditSectionForm 
            data={sect}
            key={sect._id}
          />
        })}
        <CreateSectionForm/>

      </div>
    </article>
  )
}
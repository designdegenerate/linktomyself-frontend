import CreateCardForm from "./CreateCardForm";
import EditCardForm from "./EditCardForm";
import EditDetailsForm from "./EditDetailsForm";

export default function EditSectionForm(props) {
  const data = props.data;

  return (
    <details className="main-card">
      <summary>{data.sectionName}</summary>
      <EditDetailsForm key={data._id} _id={data._id} fullLink={data.fullLink} />
      <div className="sub-card-wrapper">
        {data.content.map((obj) => {
          return (
            <EditCardForm
              key={obj._id}
              _id={obj._id}
              image={obj.image}
              section_id={data._id}
              data={obj}
              type={data.type}
              contentType={data.contentType}
            />
          );
        })}
        <CreateCardForm
          type={data.type}
          contentType={data.contentType}
          section_id={data._id}
        />
      </div>
    </details>
  );
}

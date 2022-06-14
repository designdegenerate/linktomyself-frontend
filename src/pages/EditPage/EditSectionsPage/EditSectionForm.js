import EditCardForm from "./EditCardForm";
import EditDetailsForm from "./EditDetailsForm";

export default function EditSectionForm(props) {
  const data = props.data;

  return (
    <details className="main-card">
      <summary>{data.sectionName}</summary>
      <EditDetailsForm
        key={data._id}
        fullLink={data.fullLink}
      />
      <div className="sub-card-wrapper">
        {data.content.map((obj) => {
          return <EditCardForm key={obj._id} data={obj} />;
        })}
      </div>
    </details>
  );
}

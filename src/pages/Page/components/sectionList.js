export default function SectionList(props) {
  return (
    <div key={props._id}>
      <h2 className="oneline">{props.sectionName}</h2>
      <ul className="section-list">
        {props.content.map((item) => {
          return (
            <li key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

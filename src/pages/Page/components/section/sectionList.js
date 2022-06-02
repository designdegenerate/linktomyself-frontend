export default function SectionList(props) {
  return (
    <div key={props._id}>
      <h2 className="header-med">{props.sectionName}</h2>
      <ul className="section-list">
        {props.content.map((item) => {
          return (
            <li key={item._id}>
              <div>
                <h3>{item.title}</h3>
                {item.author ? <p className="author">{item.author}</p> : <></>}
              </div>
              <p>{item.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

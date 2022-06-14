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
              {item.description ? <p>{item.description}</p> : <></>}
              {item.link ? <a href={item.link}>About</a> : <></>}
            </li>
          );
        })}
      </ul>
      {props.fullLink ? (
        <a className="full-link" href={props.fullLink.link}>
          {props.fullLink.text}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}

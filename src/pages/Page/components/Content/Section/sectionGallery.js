export default function SectionGallery(props) {
  return (
    <div key={props._id}>
      <h2 className="header-med">{props.sectionName}</h2>
      <ul className="section-gallery">
        {props.content.map((item) => {
          return (
            <li key={item._id}>
              <div
                className="image"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="text">
                <h3>{item.title}</h3>
                {item.author ? <p>{item.author}</p> : <></>}
                {item.description ? <p>{item.description}</p> : <></>}
                {item.link ? <a href={item.link}>About</a> : <></>}
              </div>
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

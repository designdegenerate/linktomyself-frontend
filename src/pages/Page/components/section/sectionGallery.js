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
                style={{backgroundImage: `url(${item.image})`}}
              >
              </div>
              <div className="text">
                <h3>{item.title}</h3>
                {item.author ? <p>{item.author}</p> : <></>}
                <p>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

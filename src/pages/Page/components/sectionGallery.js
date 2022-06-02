export default function SectionGallery(props) {
  return (
    <div key={props._id}>
      <h2 className="oneline">{props.sectionName}</h2>
      <ul className="section-gallery">
        {props.content.map((item) => {
          return (
            <li key={item._id}>
              <img
                alt="alt tag"
                decoding="async"
                loading="lazy"
                src={item.image}
              ></img>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

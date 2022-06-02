import SectionGallery from "./sectionGallery";
import SectionList from "./sectionList";
import './style.scss';

export default function Section(props) {
  const { _id, sectionName, icon, type, content } = props.data;

  return (
    <section className="page-section" key={_id}>
      {
        type === "gallery" ? (
          <SectionGallery
            _id={_id}
            sectionName={sectionName}
            content={content}
          />
        ) : type === "list" ? (
          <SectionList
          _id={_id}
          sectionName={sectionName}
          content={content}
        />
        ) : (
          <></>
        )
      }
    </section>
  );
}

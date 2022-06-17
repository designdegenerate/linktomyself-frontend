import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../../store/user/selectors";
import ButtonBorder from "../../../../components/Forms/Buttons/ButtonBorder";
import {
  updateSectionCard,
  updateCardImage,
  deleteCard,
} from "../../../../store/user/actions";
import TextField from "../../../../components/Forms/TextFields/TextField";
import LinkField from "../../../../components/Forms/TextFields/LinkField";
import { useEffect, useState } from "react";
import determineSection from "./determineSection";

export default function EditCardForm(props) {
  const data = props.data;
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);
  const [getSection, setSection] = useState({
    title: false,
    author: false,
    description: false,
    authorType: "",
    image: false,
    imageAlt: false,
    url: false,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data._id = props._id;
    data.image = props.image;
    const section_id = props.section_id;
    console.log("_id: ", props._id, " section: ", props.section_id);
    dispatch(updateSectionCard(data, section_id));
  };

  const handleImage = (e) => {
    dispatch(updateCardImage(e.target.files, props._id, props.section_id));
  };

  const removeSection = (data) => {
    data._id = props._id;
    data.section_id = props.section_id;
    dispatch(deleteCard(data));
  };

  useEffect(() => {
    const datatype = determineSection(props.contentType);
    setSection(datatype);
  }, [props.contentType]);

  return (
    <form className="sub-card" onSubmit={handleSubmit(onSubmit)}>
      {getSection.title ? (
        <TextField
          name="title"
          title="Title"
          errors={errors.title?.message}
          register={register("title", {
            required: {
              value: true,
              message: "Required",
            },
            value: data.title,
          })}
        />
      ) : (
        <></>
      )}

      {getSection.author ? (
        <TextField
          name="author"
          title={getSection.authorType}
          errors={errors.author?.message}
          register={register("author", { value: data.author,
          })}
        />
      ) : (
        <></>
      )}

      {getSection.description ? (
        <TextField
          name="description"
          title="Description"
          errors={errors.description?.message}
          register={register("description", { value: data.description })}
        />
      ) : (
        <></>
      )}

      {getSection.image ? (
        <div className="card-image">
          <p>Picture</p>
          {props.image ? (
            <div
              className="image"
              style={{
                backgroundImage: `url(${props.image})`,
              }}
            >
              {isLoading ? (
                <div>
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                    className="loaderIcon"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </g>
                    </g>
                  </svg>
                </div>
              ) : (
                <> </>
              )}
            </div>
          ) : (
            <></>
          )}
          <input
            type="file"
            id={`image_${props._id}`}
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleImage}
          ></input>
          <label htmlFor={`image_${props._id}`}>Update Picture</label>
          <div className="input-notes">
            <p>Will be cropped</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      {getSection.imageAlt ? (
        <TextField
          name="imageAlt"
          title="Image Descrription (for blind users)"
          errors={errors.description?.message}
          register={register("imageAlt", { value: data.description })}
        />
      ) : (
        <></>
      )}

      {getSection.url ? (
        <LinkField
          name="link"
          title="URL"
          errors={errors.link?.message}
          register={register("link", {
            value: props.link,
          })}
        />
      ) : (
        <></>
      )}

      {isLoading ? (
        <LoadingButton />
      ) : (
        <div className="edit-links-btn-row">
          <SubmitButton title="Update" />
          <ButtonBorder
            linkId={props.id}
            title="Delete"
            onClick={handleSubmit(removeSection)}
          />
        </div>
      )}
    </form>
  );
}

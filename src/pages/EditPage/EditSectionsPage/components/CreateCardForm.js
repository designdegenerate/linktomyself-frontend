import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../../store/user/selectors";
import { createSectionCard } from "../../../../store/user/actions";
import TextField from "../../../../components/Forms/TextFields/TextField";
import LinkField from "../../../../components/Forms/TextFields/LinkField";
import { useEffect, useState } from "react";
import determineSection from "./determineSection";

export default function CreateCardForm(props) {
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
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const section_id = props.section_id;
    dispatch(createSectionCard(data, section_id));
    reset();
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
          register={register("author")}
        />
      ) : (
        <></>
      )}

      {getSection.description ? (
        <TextField
          name="description"
          title="Description"
          errors={errors.description?.message}
          register={register("description")}
        />
      ) : (
        <></>
      )}

      {getSection.url ? (
        <LinkField
          name="link"
          title="URL"
          errors={errors.link?.message}
          register={register("link")}
        />
      ) : (
        <></>
      )}

      {getSection.image ? (
        <div className="input-notes">
          <p>after creating the card, an image can also be added</p>
        </div>
      ) : (
        ""
      )}

      {isLoading ? <LoadingButton /> : <SubmitButton title="Create New Card" />}
    </form>
  );
}

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../components/Forms/TextFields/TextField";
import LinkField from "../../../components/Forms/TextFields/LinkField";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../store/user/selectors";
import ButtonBorder from "../../../components/Forms/Buttons/ButtonBorder";
import { updateLink, deleteLink } from "../../../store/user/actions";

export default function EditCardForm(props) {
  const data = props.data;
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data._id = props.id;
    dispatch(updateLink(data));
  };

  const removeSection = (data) => {
    data._id = props.id;
    dispatch(deleteLink(data));
  };

  return (
    <form className="sub-card" onSubmit={handleSubmit(onSubmit)}>
      <h2>{props.sectionName}</h2>
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
      <TextField
        name="description"
        title="Description"
        errors={errors.description?.message}
        register={register("description", {
          required: {
            value: true,
            message: "Required",
          },
          value: data.description,
        })}
      />
      <LinkField
        name="link"
        title="URL"
        errors={errors.link?.message}
        register={register("link", {
          value: props.link,
        })}
      />
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

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../components/Forms/TextFields/TextField";
import LinkField from "../../../components/Forms/TextFields/LinkField";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../store/user/selectors";
import ButtonBorder from "../../../components/Forms/Buttons/ButtonBorder";
import { updateLink, deleteLink } from "../../../store/user/actions";

export default function EditDetailsForm(props) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <div className="header">
          <SubmitButton title="Update" />
          <h2>{props.sectionName}</h2>
          <ButtonBorder
            linkId={props.id}
            title="Delete"
            onClick={handleSubmit(removeSection)}
          />
        </div>
      )}
      <div className="section-info">
        <TextField
          name="text"
          title="Title"
          errors={errors.text?.message}
          register={register("text", {
            required: {
              value: true,
              message: "Required",
            },
            value: props.fullLink.text,
          })}
        />
        <LinkField
          name="link"
          title="URL"
          errors={errors.link?.message}
          register={register("link", {
            required: {
              value: true,
              message: "Required",
            },
            value: props.fullLink.link,
          })}
        />
      </div>
    </form>
  );
}

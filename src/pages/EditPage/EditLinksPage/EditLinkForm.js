import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../components/Forms/TextFields/TextField";
import LinkField from "../../../components/Forms/TextFields/LinkField";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../store/user/selectors";
import ButtonBorder from "../../../components/Forms/Buttons/ButtonBorder";

export default function EditLinkForm(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data._id = props.id
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="text"
        title="Title"
        errors={errors.text?.message}
        register={register("text", {
          required: {
            value: true,
            message: "Required",
          },
          value: props.text,
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
          value: props.link,
        })}
      />
      {isLoading ? (
        <LoadingButton />
      ) : (
        <div className="edit-links-btn-row">
          <SubmitButton title="Apply" />
          <ButtonBorder linkId={props.id} title="Delete" />
        </div>
      )}
    </form>
  );
}

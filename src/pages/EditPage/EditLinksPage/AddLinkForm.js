import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import TextField from "../../../components/Forms/TextFields/TextField";
import LinkField from "../../../components/Forms/TextFields/LinkField";
import { isDataUpdating } from "../../../store/user/selectors";
import "./style.scss";
import { addLink } from "../../../store/user/actions";

export default function AddLinkForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addLink(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add a link</h2>
      <TextField
        name="text"
        title="Title"
        placeholder="Website"
        errors={errors.text?.message}
        register={register("text", {
          required: {
            value: true,
            message: "Required",
          },
        })}
      />
      <LinkField
        name="link"
        title="URL"
        placeholder="example.com"
        errors={errors.link?.message}
        register={register("link", {
          required: {
            value: true,
            message: "Required",
          },
        })}
      />
      {isLoading ? <LoadingButton /> : <SubmitButton title="Add Link" />}
    </form>
  );
}

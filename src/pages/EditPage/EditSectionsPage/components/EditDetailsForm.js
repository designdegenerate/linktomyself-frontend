import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../../components/Forms/TextFields/TextField";
import LinkField from "../../../../components/Forms/TextFields/LinkField";
import Checkbox from "../../../../components/Forms/Checkbox";
import LoadingButton from "../../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../../components/Forms/Buttons/SubmitButton";
import { isDataUpdating } from "../../../../store/user/selectors";
import ButtonBorder from "../../../../components/Forms/Buttons/ButtonBorder";
import { deleteCard, updateSectionDetails } from "../../../../store/user/actions";

export default function EditDetailsForm(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data._id = props._id;
    dispatch(updateSectionDetails(data));
  };

  const removeSection = (data) => {
    data._id = props._id;
    dispatch(deleteCard(data));
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
          title="Link Title"
          errors={errors.text?.message}
          register={register("text", { value: props.fullLink.text })}
        />
        <LinkField
          name="link"
          title="Link URL"
          errors={errors.link?.message}
          register={register("link", { value: props.fullLink.link })}
        />
        <Checkbox
          name="visible"
          title="Visible"
          errors={errors.link?.message}
          register={register("visible", { value: props.fullLink.visible})}
        />
      </div>
    </form>
  );
}

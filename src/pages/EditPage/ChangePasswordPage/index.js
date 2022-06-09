import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import TextField from "../../../components/Forms/TextFields/TextField";
import { isDataUpdating } from "../../../store/user/selectors";
import "./style.scss";
import { Link } from "react-router-dom";
import { updateData } from "../../../store/user/actions";
import Password from "../../../components/Forms/TextFields/Password";
import FormError from "../../../components/Forms/FormError";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(isDataUpdating);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateData([{ ...data }]));
  };

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Link className="return-to-profile" to="/u/settings">Back to Profile Settings</Link>
        <h1>Change Password</h1>
        <Password
          error={errors.password?.message}
          register={register("password", {
            required: {
              value: true,
              message: "Required",
            },
          })}
        />
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            {...register("newPassword", {
              required: {
                value: true,
                message: "Required",
              },
            })}
            id="newPassword"
            placeholder="•  •  •  •  •  •  •  •"
            type="password"
            name="newPassword"
          ></input>
          <FormError string={errors.newPassword} />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <SubmitButton title="Change Password" />
        )}
      </form>

      <form></form>
    </article>
  );
}

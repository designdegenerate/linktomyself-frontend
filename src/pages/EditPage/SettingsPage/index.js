import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../../components/Forms/Buttons/SubmitButton";
import Email from "../../../components/Forms/TextFields/Email";
import TextField from "../../../components/Forms/TextFields/TextField";
import TextAreaField from "../../../components/Forms/TextFields/TextAreaField";
import {
  isDataUpdating,
  selectUserPage,
  selectUserProfile,
} from "../../../store/user/selectors";
import "./style.scss";
import { Link } from "react-router-dom";
import { restoreLogin, updateData } from "../../../store/user/actions";
import { useEffect } from "react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const userPage = useSelector(selectUserPage);
  const isLoading = useSelector(isDataUpdating);
  const { email: oldEmail, username: oldUsername, name: oldName } = userProfile;
  const { bio: oldBio, oneLiner: oldOneLiner } = userPage;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const watchUsername = watch("username");

  useEffect(() => {
    // MongoDB doesn't store 
    // keys with empty strings by default
    // so fetching this data once more to be
    // safe.
    dispatch(restoreLogin());
  }, [])


  const onSubmit = (data) => {
    let dataToSend = [];

    for (const key in dirtyFields) {
      dataToSend = [
        ...dataToSend,
        {
          [key]: data[key],
        },
      ];
    }

    dispatch(updateData(dataToSend));

  };

  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Profile Settings</h1>
        <Email
          error={errors.email?.message}
          register={register("email", {
            required: {
              value: true,
              message: "Required",
            },
            value: oldEmail,
          })}
        />
        <TextField
          name="username"
          title="Username"
          errors={errors.username?.message}
          maxlength="20"
          register={register("username", {
            required: {
              value: true,
              message: "Required",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.-]*$/,
              message:
                "Username can only contain the following characters: aA–zZ, 0–9, '_', and '-'",
            },
            value: oldUsername,
            maxLength: 20
          })}
        />
        <div className="input-notes">
          <p>This will used as your link:</p>
          <p>https://linktomyself/p/{watchUsername}</p>
        </div>
        <div className="change-password">
          <label htmlFor="password">Password</label>
          <Link to="/u/change-password">Change Password</Link>
        </div>
        <TextField
          name="name"
          title="Name"
          errors={errors.name?.message}
          register={register("name", {
            required: {
              value: true,
              message: "Required",
            },
            value: oldName,
          })}
        />
        <TextField
          name="oneLiner"
          title="Summary"
          maxlength="80"
          errors={errors.oneLiner?.message}
          register={register("oneLiner", {
            value: oldOneLiner,
            maxLength: 80,
          })}
        />
        <div className="input-notes">
          <p>
            A one line summary about yourself. This will be shown under your
            username.
          </p>
        </div>
        <TextAreaField
          name="bio"
          title="Bio"
          errors={errors.bio?.message}
          register={register("bio", {
            value: oldBio,
            maxLength: 300,
          })}
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <SubmitButton title="Update Profile" />
        )}
      </form>

      <form></form>
    </article>
  );
}

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
import {
  deleteProfileImage,
  restoreLogin,
  updateData,
  updateProfileImage,
} from "../../../store/user/actions";
import colorThemes from "../../../colors.json";
import { useEffect } from "react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const userPage = useSelector(selectUserPage);
  const isLoading = useSelector(isDataUpdating);
  const { email: oldEmail, username: oldUsername, name: oldName } = userProfile;
  const { bio: oldBio, oneLiner: oldOneLiner, colors, profileImage } = userPage;

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
  }, [dispatch]);

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
    <article className="edit-profile">
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
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
            maxLength: 20,
          })}
        />
        <div className="input-notes">
          <p>This will used as your link:</p>
          <p>https://linktomyself/p/{watchUsername}</p>
        </div>
        <div className="change-password">
          <label htmlFor="password">Password</label>
          <Link id="password" to="/u/change-password">
            Change Password
          </Link>
        </div>
        <div className="profile-picture">
          <p>Profile Picture</p>
          <div
            className="image"
            style={{
              backgroundImage: `url(${profileImage?.link})`,
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
        </div>
        <div className="profile-picture-buttons">
          <div>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                console.log("test");
                dispatch(updateProfileImage(e.target.files));
              }}
            ></input>
            <label htmlFor="profileImage">Update Picture</label>
          </div>
          {profileImage ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteProfileImage());
              }}
              className="button-filled"
            >
              Remove
            </button>
          ) : (
            <></>
          )}
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
        <div className="select-color-scheme">
          <label htmlFor="lightColors">Light Color Scheme</label>
          <select
            {...register("lightColors", { value: colors.light.name })}
            name="lightColors"
            id="lightColors"
          >
            {colorThemes.light.map((theme) => {
              return (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-notes">
          <p>When the device is in light mode.</p>
        </div>
        <div className="select-color-scheme">
          <label>Dark Color Scheme</label>
          <select
            {...register("darkColors", { value: colors.dark.name })}
            name="darkColors"
            id="darkColors"
          >
            {colorThemes.dark.map((theme) => {
              return (
                <option key={theme.name} value={theme.name}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-notes">
          <p>When the device is in dark mode.</p>
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <SubmitButton title="Update Profile" />
        )}
        <div className="delete-user">
          <label htmlFor="deleteUser">Danger Zone</label>
          <Link id="deleteUser" to="/u/delete-account">
            Delete Account
          </Link>
        </div>
      </form>
    </article>
  );
}

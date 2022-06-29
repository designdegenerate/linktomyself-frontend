import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { registerUser } from "../../store/user/actions";
import { isUserLoading, selectUserProfile } from "../../store/user/selectors";
import { useForm } from "react-hook-form";
import Email from "../../components/Forms/TextFields/Email";
import TextField from "../../components/Forms/TextFields/TextField";
import Checkbox from "../../components/Forms/Checkbox";
import Password from "../../components/Forms/TextFields/Password";
import SubmitButton from "../../components/Forms/Buttons/SubmitButton";
import LoadingButton from "../../components/Forms/Buttons/LoadingButton";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const hasProfile = useSelector(selectUserProfile);
  const loadingUser = useSelector(isUserLoading);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchUsername = watch("username");

  const onSubmit = (data) => {
    dispatch(registerUser(data.email, data.password, data.username, data.name));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hasProfile !== null) {
      navigate(`/p/${hasProfile.username}`);
    }
  }, [hasProfile, navigate]);

  return (
    <main id="top">
      <div className="auth">
        <div className="auth-form-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create an account</h1>
            <Email
              error={errors.email?.message}
              register={register("email", {
                required: {
                  value: true,
                  message: "Required",
                },
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
                maxLength: 20,
              })}
            />
            {watchUsername ? (
              <div className="input-notes">
                <p>This will used as your link:</p>
                <p>https://linktomyself/p/{watchUsername}</p>
              </div>
            ) : (
              <></>
            )}
            <TextField
              name="name"
              title="Name"
              errors={errors.name?.message}
              register={register("name", {
                required: {
                  value: true,
                  message: "Required",
                },
              })}
            />
            <p className="input-notes">
              It's recommended to use your actual name
            </p>
            <Password
              errors={errors.password?.message}
              register={register("password", {
                required: {
                  value: true,
                  message: "Required",
                },
                minLength: {
                  value: 8,
                  message: "Password needs to be at least 8 characters",
                },
              })}
            />
            <br></br>
            <p className="input-notes">
              By using this service, you agree with the <Link to="/privacypolicy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> and <Link to="/tos" target="_blank" rel="noopener noreferrer">Terms of Service</Link>.
            </p>
            <Checkbox
              name="agreeToTerms"
              title="I agree to these terms"
              errors={errors.agreeToTerms?.message}
              register={register("agreeToTerms", {
                required: {
                  value: true,
                  message: "Required"
                }
              })}
            />
            {loadingUser ? <LoadingButton /> : <SubmitButton />}
            <div>
              <p>Have an account?</p>
              <Link to="/login">Login instead</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

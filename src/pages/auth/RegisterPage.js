import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { registerUser } from "../../store/user/actions";
import { isUserLoading, selectUserProfile } from "../../store/user/selectors";
import FormError from "../../components/Forms/FormError";
import { useForm } from "react-hook-form";
import LoadingButton from "../../components/Forms/LoadingButton";

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
    if (hasProfile !== null) {
      navigate(`/p/${hasProfile.username}`);
    }
  }, [hasProfile, navigate]);

  return (
    <main>
      <div className="auth">
        <div className="auth-form-wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create an account</h1>
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                })}
                id="email"
                type="email"
                name="email"
                placeholder="user@example.com"
              ></input>
              <FormError string={errors.email?.message} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                {...register("username", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.-]*$/,
                    message:
                      "Username can only contain the following characters: aA–zZ, 0–9, '_', and '-'",
                  },
                })}
                id="username"
                type="text"
                name="username"
                maxlength={16}
              ></input>
              <FormError string={errors.username?.message} />
              {watchUsername ? (
                <div className="input-notes">
                  <p>This will used as your link:</p>
                  <p>https://linktomyself/p/{watchUsername}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                })}
                id="name"
                type="text"
                name="name"
                required
              ></input>
              <FormError string={errors.name?.message} />
              <p className="input-notes">
                It's recommended to use your actual name
              </p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password needs to be at least 8 characters",
                  },
                })}
                id="password"
                type="password"
                name="password"
                required
              ></input>
              <FormError string={errors.password?.message} />
            </div>
            {loadingUser ? (
              <LoadingButton />
            ) : (
              <button className="button-filled" type="submit">
                Continue
              </button>
            )}
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

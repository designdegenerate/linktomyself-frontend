import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import FormError from "../../components/Forms/FormError";
import LoadingButton from "../../components/Forms/LoadingButton";
import { loginUser } from "../../store/user/actions";
import { isUserLoading, selectUserProfile } from "../../store/user/selectors";
import "./style.scss";

export default function LoginPage() {
  const dispatch = useDispatch();
  const hasProfile = useSelector(selectUserProfile);
  const loadingUser = useSelector(isUserLoading);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data.email, data.password));
    console.log(data);
  };

  useEffect(() => {
    if (hasProfile !== null) {
      navigate(`/p/${hasProfile.username}`);
    }
  }, [hasProfile, navigate]);

  return (
    <main className="auth">
      <div className="auth-form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
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
              placeholder="user@example.com"
              type="email"
              name="email"
            ></input>
            <FormError string={errors.email?.message} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Required",
                },
              })}
              id="password"
              placeholder="•  •  •  •  •  •  •  •"
              type="password"
              name="password"
            ></input>
            <FormError string={errors.email?.message} />
          </div>
          {loadingUser ? (
            <LoadingButton/>
          ) : (
            <button className="button-filled" type="submit">
              Continue
            </button>
          )}
          <div>
            <p>Need an account?</p>
            <Link to="/signup">sign up</Link>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}

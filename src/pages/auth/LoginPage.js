import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import LoadingButton from "../../components/Forms/Buttons/LoadingButton";
import SubmitButton from "../../components/Forms/Buttons/SubmitButton";
import Email from "../../components/Forms/TextFields/Email";
import Password from "../../components/Forms/TextFields/Password";
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
          <Email
            error={errors.email?.message}
            register={register("email", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          <Password
            error={errors.password?.message}
            register={register("password", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          {loadingUser ? (
            <LoadingButton />
          ) : (
            <SubmitButton />
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

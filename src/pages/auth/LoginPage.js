import { Field, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import InvalidEmail from "../../components/Forms/InvalidEmail";
import Required from "../../components/Forms/Required";
import { loginUser } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";
import "./style.scss";

export default function LoginPage() {
  const dispatch = useDispatch();
  const hasProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasProfile !== null) {
      navigate(`/p/${hasProfile.username}`);
    }
  }, [hasProfile, navigate]);

  return (
    <main className="auth">
      <div className="auth-form-wrapper">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = <Required/>;
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = <InvalidEmail/>;
            }

            if (!values.password) {
              errors.password = <Required/>;
            }
            return errors;

          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginUser(values.email, values.password));
            setSubmitting = false;
          }}
          
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  placeholder="user@example.com"
                  type="email"
                  name="email"
                  required
                ></Field>
                {errors.email && touched.email && errors.email}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="•  •  •  •  •  •  •  •"
                  required
                ></Field>
                {errors.password && touched.password && errors.password}
              </div>
              <button
                className="button-filled"
                type="submit"
                disabled={isSubmitting}
              >
                Continue
              </button>
              <div>
                <p>Need an account?</p>
                <Link to="/signup">sign up</Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Footer />
    </main>
  );
}

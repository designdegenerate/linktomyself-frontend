import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { loginUser } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";
import "./style.scss";

export default function LoginPage() {
  const dispatch = useDispatch();
  const hasProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasProfile !== null) {
      navigate("/");
    }
  }, [hasProfile, navigate]);

  return (
    <main className="auth">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(loginUser(values.email, values.password));
          setSubmitting = false;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1>Welcome back!</h1>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
            <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <button className="button-filled" type="submit" disabled={isSubmitting}>
              Continue
            </button>
            <Link to="/signup">Or sign up</Link>
          </form>
        )}
      </Formik>
      <Footer/>
    </main>
  );
}

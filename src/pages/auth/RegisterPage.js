import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { registerUser } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const hasProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasProfile !== null) {
      navigate("/");
    }
  }, [hasProfile, navigate]);

  return (
    <main>
      <div className="auth">
        <div className="auth-form-wrapper">
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
              dispatch(
                registerUser(
                  values.email,
                  values.password,
                  values.username,
                  values.name
                )
              );
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
                <h1>Create an account</h1>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                </div>
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {values.username ? (
                    <div>
                      <p>This will used as your link:</p>
                      <p>https://linktomyself/p/{values.username}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p>It's recommended to use your actual name</p>
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
                <button
                  className="button-filled"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Continue
                </button>
                <div>
                  <p>Have an account?</p>
                  <Link to="/login">Login instead</Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </main>
  );
}

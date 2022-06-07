import { Field, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Required from "../../components/Forms/Required";
import InvalidEmail from "../../components/Forms/InvalidEmail";
import { registerUser } from "../../store/user/actions";
import { selectUserProfile } from "../../store/user/selectors";
import FormError from "../../components/Forms/FormError";
const ascii = /^[a-zA-Z\d\u002E\u002D\u005F]*$/;

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
                errors.email = <Required/>;
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = <InvalidEmail/>;
              }

              if (!values.username) {
                errors.username = <Required/>
              } else if ( !ascii.test(values.username)
                  ) {
                errors.username = <FormError string="username can only contain ASCII characters (aA–zZ, 0–9, '_', and '-')."/>
              } else if (values.username.length > 12) {
                errors.username = <FormError string="Username cannot be longer than 12 characters"/>
              }

              if (!values.name) {
                errors.name = <Required/>
              }

              if (!values.password) {
                errors.password = <Required/>
              } else if (values.password.length < 8) {
                errors.password = <FormError string="password needs to be at least 8 characters"/>
              }

              if (!values.passwordRepeat) {
                errors.passwordRepeat = <Required/>
              } else if (values.password !== values.passwordRepeat) {
                errors.passwordRepeat = <FormError string="Passwords don't match"/>
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
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    required
                  ></Field>
                  {errors.email && touched.email && errors.email}
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    maxLength={12}
                    required
                  ></Field>
                  {errors.username}
                  {values.username ? (
                    <div className="input-notes">
                      <p>This will used as your link:</p>
                      <p>https://linktomyself/p/{values.username}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    required
                  ></Field>
                    {errors.name && touched.name && errors.name}
                  <p className="input-notes">It's recommended to use your actual name</p>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLenght={8}
                  ></Field>
                  {errors.password && touched.password && errors.password}
                </div>
                <div>
                  <label htmlFor="passwordRepeat">Repeat Password</label>
                  <Field
                    id="passwordRepeat"
                    type="password"
                    name="passwordRepeat"
                    required
                    minLenght={8}
                  ></Field>
                  {errors.passwordRepeat && touched.passwordRepeat && errors.passwordRepeat}
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

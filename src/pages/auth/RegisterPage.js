import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../store/user/actions";

export default function RegisterPage() {
  const dispatch = useDispatch();
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
          dispatch(registerUser(values.email, values.password, values.username, values.name));
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
            <button type="submit" disabled={isSubmitting}>
              Continue
            </button>
            <div>
              <p>Have an account?</p>
              <Link to="/signup">Login instead</Link>
            </div>
          </form>
        )}
      </Formik>
    </main>
  );
}

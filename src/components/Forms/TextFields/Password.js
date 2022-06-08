import FormError from "../FormError";

export default function Password(props) {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        {...props.register}
        id="password"
        placeholder="•  •  •  •  •  •  •  •"
        type="password"
        name="password"
      ></input>
      <FormError string={props.errors} />
    </div>
  );
}

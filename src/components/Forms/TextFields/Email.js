import FormError from "../FormError";

export default function Email(props) {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        {...props.register}
        id="email"
        placeholder="user@example.com"
        type="email"
        name="email"
      ></input>
      <FormError string={props.error} />
    </div>
  );
}

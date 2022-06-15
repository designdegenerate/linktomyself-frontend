import FormError from "./FormError";

export default function TextField(props) {
  return (
    <div className="checkbox-wrapper">
      <label htmlFor={props.name}>
        {props.title ? props.title : props.name}
      </label>
      <input
        {...props.register}
        id={props.name}
        type="checkbox"
        name={props.name}
        checked={props.checked}
      ></input>
      <FormError string={props.errors} />
    </div>
  );
}

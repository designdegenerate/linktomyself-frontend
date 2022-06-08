import FormError from "../FormError";

export default function TextField(props) {
  return (
    <div>
      <label htmlFor={props.name}>
        {props.title ? props.title : props.name}
      </label>
      <input
        {...props.register}
        id={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        type="text"
        name={props.name}
      ></input>
      <FormError string={props.errors} />
    </div>
  );
}

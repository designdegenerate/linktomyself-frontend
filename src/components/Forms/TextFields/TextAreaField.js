import FormError from "../FormError";

export default function TextAreaField(props) {
  return (
    <div>
      <label htmlFor={props.name}>
        {props.title ? props.title : props.name}
      </label>
      <textarea
        {...props.register}
        id={props.name}
        placeholder={props.placeholder ? props.placeholder : ""}
        type="text"
        name={props.name}
      ></textarea>
      <FormError string={props.errors} />
    </div>
  );
}

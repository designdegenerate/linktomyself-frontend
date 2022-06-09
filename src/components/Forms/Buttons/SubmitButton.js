export default function SubmitButton(props) {
  return (
    <button className="button-filled" type="submit">
      {props.title ? props.title : "Continue"}
    </button>
  );
}

export default function ButtonFilled(props) {
  return (
    <button
    className="button-filled min-padding"
    onClick={props.onClick}
    >{props.title}</button>
  )
}
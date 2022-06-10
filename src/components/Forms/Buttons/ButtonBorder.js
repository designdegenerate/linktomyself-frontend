export default function ButtonBorder(props) {
  return (
    <button
    className="button-border min-padding"
    onClick={props.onClick}
    >{props.title}</button>
  )
}
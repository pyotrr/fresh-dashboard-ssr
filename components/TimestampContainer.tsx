export default function TimestampContainer(props: { date: Date }) {
  return <pre>{props.date.toISOString()}</pre>;
}

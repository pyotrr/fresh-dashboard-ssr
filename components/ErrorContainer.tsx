export default function ErrorContainer(props: { error: unknown }) {
  return <pre style={{ color: "red" }}>Couldn't fetch status</pre>;
}

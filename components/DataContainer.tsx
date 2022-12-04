export default function DataContainer<T,>(props: { data: T }) {
  return <pre>{JSON.stringify(props.data)}</pre>;
}

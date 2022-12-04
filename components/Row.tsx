export default function Row(props: { children: any }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "0.75rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {props.children}
    </div>
  );
}

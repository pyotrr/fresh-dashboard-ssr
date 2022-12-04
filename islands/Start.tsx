import { Button } from "../components/Button.tsx";
import { useFetch } from "../hooks/useFetch.ts";
import TimestampContainer from "../components/TimestampContainer.tsx";
import DataContainer from "../components/DataContainer.tsx";
import ErrorContainer from "../components/ErrorContainer.tsx";
import Row from "../components/Row.tsx";

interface StartProps {
  endpointUrl: string;
}

export default function Start(props: StartProps) {
  const { data, loading, error, fetchData, lastFetched } = useFetch<
    { currentState: string; previousState: string; success: boolean }
  >(
    props.endpointUrl,
  );

  return (
    <Row>
      <Button type="button" onClick={fetchData}>
        {loading ? "Loading..." : "Start instance"}
      </Button>
      {error && <ErrorContainer error={error} />}
      {data && <DataContainer data={data} />}
      {lastFetched && <TimestampContainer date={lastFetched} />}
    </Row>
  );
}

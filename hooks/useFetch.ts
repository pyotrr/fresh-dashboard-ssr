import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export function useFetch<Data>(url: string, options?: RequestInit) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(() => {
    if (!isMounted.current) return;
    setLoading(true);
    fetch(url, options || {}).then(async (res) => {
      if (!isMounted.current) return;
      const resData = await res.json() as Data;
      setData(resData);
      setLoading(false);
      setError(null);
      setLastFetched(new Date());
    }).catch((error) => {
      if (!isMounted.current) return;
      setError(error);
      setData(null);
      setLoading(false);
      setLastFetched(new Date());
    });
  }, [url]);

  return {
    fetchData,
    data,
    loading,
    error,
    lastFetched,
  };
}

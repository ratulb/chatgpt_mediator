import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    return () => {
      controller.abort();
    };
  }, [url]);
  return [loading, data, error];
};

export default useFetch;

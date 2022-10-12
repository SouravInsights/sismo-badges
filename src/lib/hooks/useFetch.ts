import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface UseFetchProps {
  url: string;
}

export const useFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    revalidate: fetch,
  };
};

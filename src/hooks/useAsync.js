import { useCallback, useEffect, useRef, useState } from "react";

const useAsync = (
  asyncFuntion,
  args = [],
  deps = [],
  immediate = true,
  condition = true,
  automated = true,
  callback = (succeed, response) => {},
) => {
  const isFirstUpdate = useRef(true);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const execute = useCallback(() => {
    if (condition) {
      setLoading(true);
      setResponse(null);
      setError(null);
      return asyncFuntion(...args)
        .then((response) => {
          setResponse(response);
          callback?.(true, response);
        })
        .catch((error) => {
          setError(error);
          callback?.(false, error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [condition, asyncFuntion, args, callback]);

  useEffect(() => {
    if (automated) {
      if (immediate || condition) {
        execute();
      } else if (!isFirstUpdate.current) {
        execute();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, condition]);

  useEffect(() => {
    isFirstUpdate.current = false;
  }, []);

  return { execute, response, error, loading };
};

export default useAsync;
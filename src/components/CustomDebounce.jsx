// Simple Custom Debounce hooks
import { useEffect, useState } from "react";

// Custom debounce hook
const useDebounce = (callback, delay) => {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    // Cleanup function to clear the timeout
    return () => clearTimeout(handler);
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;

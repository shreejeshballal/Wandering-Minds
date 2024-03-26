/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

interface DebounceProps {
  value: string;
  delay: number;
}

const useDebounce = ({ value, delay }: DebounceProps) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(ref.current!);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;

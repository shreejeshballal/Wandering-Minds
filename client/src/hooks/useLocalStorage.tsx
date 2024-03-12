import { isNullOrUndefined } from "@/lib/utils";
import { useState, useEffect } from "react";

type StorageValue<T> = T | string | null;

interface Options<T> {
  serialize?: (value: T) => StorageValue<T>;
  deserialize?: (value: StorageValue<T>) => T;
}

const useLocalStorage = <T,>(
  key: string,
  defaultValue: T,
  options?: Options<T>
) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }
    const parsedValue = options?.deserialize
      ? options.deserialize(storedValue)
      : JSON.parse(storedValue);

    return parsedValue || defaultValue;
  });

  useEffect(() => {
    const newValue = (!isNullOrUndefined(value) ? value : defaultValue) as T;
    const serializedValue = options?.serialize
      ? options.serialize(newValue)
      : JSON.stringify(newValue);
    localStorage.setItem(key, serializedValue as string);

    return () => {
      localStorage.removeItem(key);
    };
  }, [value]);

  return [value, setValue] as const;
};

export default useLocalStorage;

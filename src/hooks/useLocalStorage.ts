import { useState } from "react";

type UseLocalStorageOptions = {
  key: string;
  initialValue?: unknown;
};

type UseLocalStorage = (
  options: UseLocalStorageOptions
) => [unknown, (value: unknown) => void];

const useLocalStorage: UseLocalStorage = function ({ key, initialValue }) {
  // get the storedValue in localStorage OR store the initialValue in localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // State for storing the value
  const [value, setValue] = useState(initial);

  // update function for updating localStorage and state at the same time
  function updateValue(value: unknown) {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, updateValue];
};

export { useLocalStorage };

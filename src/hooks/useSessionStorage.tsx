import { useState, useEffect } from "react";

// Typy dla hooka
interface UseSessionStorageOptions {
  defaultValue?: any;
  serializer?: (value: any) => string;
  deserializer?: (value: string) => any;
}

export function useSessionStorage<T>(
  key: string,
  options: UseSessionStorageOptions = {}
): [T | undefined, (value: T | undefined) => void] {
  const {
    defaultValue,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  // Stan do przechowywania wartości
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? deserializer(item) : defaultValue;
    } catch (error) {
      console.error(
        "useSessionStorage: Error reading sessionStorage key “" + key + "”",
        error
      );
      return defaultValue;
    }
  });

  const setValue = (value: T | undefined) => {
    try {
      const valueToStore = value === undefined ? "" : serializer(value);
      setStoredValue(value);
      sessionStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(
        "useSessionStorage: Error setting sessionStorage key “" + key + "”",
        error
      );
    }
  };

  // Hook do synchronizacji stanu z sessionStorage
  useEffect(() => {
    const handleStorage = () => {
      try {
        const item = sessionStorage.getItem(key);
        setStoredValue(item ? deserializer(item) : defaultValue);
      } catch (error) {
        console.error(
          "useSessionStorage: Error syncing sessionStorage key “" + key + "”",
          error
        );
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, deserializer, defaultValue]);

  return [storedValue, setValue];
}

/**
 const [value, setValue] = useSessionStorage<string>('myKey', {
        defaultValue: 'Default Value',
    });
 */

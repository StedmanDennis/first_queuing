import { localStorageGet, localStorageSet } from "@/lib/storage";
import { useCallback, useEffect, useState } from "react";

function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(null)

  const updateValue = useCallback((value: T) => {
    localStorageSet(key, value)
    setValue(value)
  }, [key])

  useEffect(() => {
    const value = localStorageGet<T>(key)  
    if (value !== null){
      updateValue(value)
    }
  }, [key, updateValue])

  return [value, updateValue] as const;
}

export default useLocalStorage;
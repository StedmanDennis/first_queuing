import { useCallback, useEffect, useState } from "react";

function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(null)

  const updateValue = useCallback((value: T) => {
    if (typeof value === 'string'){
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    } 
    setValue(value)
  }, [key])

  useEffect(() => {
    const browserValue = localStorage.getItem(key)
    if (browserValue !== null){
      updateValue(JSON.parse(browserValue))
    }
  }, [key, updateValue])

  return [value, updateValue] as const;
}

export default useLocalStorage;
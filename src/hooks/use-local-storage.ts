import { useState, useEffect, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

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
    } else {
      updateValue(initialValue)
    } 
  }, [key, initialValue, updateValue])

  return [value, updateValue] as const;
}

export default useLocalStorage;
import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  const updateValue = (value: T) => {
    if (typeof value === 'string'){
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    } 
    setValue(value)
  }

  useEffect(() => {
    const browserValue = localStorage.getItem(key)
    if (browserValue !== null){
      updateValue(JSON.parse(browserValue))
    } else {
      updateValue(initialValue)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value, updateValue] as const;
}

export default useLocalStorage;
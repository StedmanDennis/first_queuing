import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  function updateValue(value: T){
    typeof value === 'string' ? localStorage.setItem(key, value) : localStorage.setItem(key, JSON.stringify(value))
    setValue(value)
  }

  useEffect(() => {
    const browserValue = localStorage.getItem(key)
    browserValue ? updateValue(JSON.parse(browserValue)) : updateValue(initialValue)
  }, [])

  return [value, updateValue] as const;
}

export default useLocalStorage;
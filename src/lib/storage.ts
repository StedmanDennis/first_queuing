export function localStorageSet(key: string, value: unknown){
    if (typeof value === 'string'){
        localStorage.setItem(key, value)
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export function localStorageGet<T>(key: string): T | null{
    const storageValue = localStorage.getItem(key)
    if (storageValue === null){
        return null
    } else {
        return JSON.parse(storageValue) as T
    }   
}
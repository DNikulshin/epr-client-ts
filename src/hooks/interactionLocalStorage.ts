export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
  return data
}
export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}')
}

export const removeLocalStorage = (key: string) => localStorage.removeItem(key)


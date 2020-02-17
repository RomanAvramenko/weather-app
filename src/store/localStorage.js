export const loadStorage = () => {
  try {
    const item = localStorage.getItem('response')
    return item ? JSON.parse(item) : undefined
  } catch (error) {
    return
  }
}

export const saveState = (state) => {
  try {
    const valueToStore = JSON.stringify(state);
    localStorage.setItem('response', valueToStore );
  } catch {
    // ignore write errors
  }
}


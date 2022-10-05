export const readFile = (fileRes) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileRes)
    reader.onload = () => {
      resolve(reader.result)
    }
  })
}

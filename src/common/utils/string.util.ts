export const removeNextString = (text: string, remove: string) => {
  const startIndexOf = text.indexOf(remove)
  const endIndexOf = startIndexOf + remove.length
  return text.substring(0, startIndexOf) + text.substring(endIndexOf, text.length)
};

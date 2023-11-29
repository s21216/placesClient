export function convertCamelCaseToReadable(inputString: string) {
  const spacedString = inputString.replace(/([A-Z])/g, ' $1');
  const resultString =
    spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase().trim();
  return resultString;
}

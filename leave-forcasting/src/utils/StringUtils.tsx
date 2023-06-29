const capitalize = (string: string): string => {
  const lowercaseString = string.toLowerCase();
  const words = lowercaseString.split(" ");
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  const capitalizedString = capitalizedWords.join(" ");
  return capitalizedString;
};

export { capitalize };

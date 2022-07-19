const findCompleteSection = (openingChar: "{" | "[") => (text: string) => {
  let openingCount = 0;
  let closingCount = 0;
  const closingChar = openingChar === "{" ? "}" : "]";

  // convert text to array
  const textArray = Array.from(text);

  // find initial opening character
  const startingIndex = textArray.findIndex((char) => char === openingChar);
  let closingIndex = textArray.length - 1;

  // throw error if opening character not found
  // TODO

  openingCount++;
  for (let i = startingIndex + 1; i < textArray.length; i++) {
    if (textArray[i] === closingChar) {
      closingCount++;
    } else if (textArray[i] === openingChar) {
      openingCount++;
    }

    if (openingCount === closingCount) {
      closingIndex = i + 1;
      break;
    }
  }

  // throw error if no closing character found
  // TODO

  return text.slice(0, closingIndex);
};

export const findBracketSection = findCompleteSection("{");
export const findArraySection = findCompleteSection("[");

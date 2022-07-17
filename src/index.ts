import { readFileSync } from "fs";
import path from "path";

// sample file
const file = path.join("./schema.graphql");

// read file and return content as string
const readFileContents = (path: string) => {
  try {
    const file = readFileSync(path);
    return file.toString();
  } catch (e) {
    return "ERROR: " + e;
  }
};

const findCompleteSection = (openingChar: "{" | "[") => (text: string) => {
  let openingCount = 0;
  let closingCount = 0;
  const closingChar = openingChar === "{" ? "}" : "]";

  // convert text to array
  const textArray = Array.from(text);

  // find initial opening character
  const startingIndex = textArray.findIndex((char) => char === openingChar);
  let closingIndex = textArray.length - 1;

  // if not found, throw error
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

  return text.slice(0, closingIndex);
};

const findBracketSection = findCompleteSection("{");
const findArraySection = findCompleteSection("[");

const parseSection = (sectionName: string) => (schema: string) => {
  // find start of section
  const sectionStart = schema.match(
    new RegExp(`type ${sectionName}\\s*\\{(\\s|.)+`)
  );

  // find where section ends

  // return section
  return sectionStart;
};

const parseQueries = parseSection("Query");
const parseMutations = parseSection("Mutation");
// ... add other sections later

const schemaFile = readFileContents(file);

const queries = parseQueries(schemaFile);

if (Array.isArray(queries)) {
  console.log(queries[0]);
  console.log("JUST QUERY:");
  console.log(findBracketSection(queries[0]));
} else {
  console.log("NULL");
}

//console.log(schemaFile);

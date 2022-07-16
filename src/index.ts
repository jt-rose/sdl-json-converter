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

const schemaFile = readFileContents(file);

console.log(schemaFile);

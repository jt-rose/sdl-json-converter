import { findBracketSection } from "./findClosingChar";

export const parseSection = (sectionName: string) => (schema: string) => {
  // find start of section
  const sectionStart = schema.match(
    new RegExp(`type ${sectionName}\\s*\\{(\\s|.)+`)
  );

  // return null if section not found
  if (!sectionStart) {
    return null;
  }

  // find where section ends
  const fullSection = findBracketSection(sectionStart[0]);

  // return complete section
  return fullSection;
};

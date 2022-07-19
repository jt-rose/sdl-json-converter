// stub
// also find !
// no tuples

import { Depth } from "../ISchema";

// for this to work, single fields need to be submitted
export const findArrayDepth = (field: string) => {
  let depth = 0;
  let levels: Depth[] = [];

  // count how many, if any, nested arrays there are
  for (const char of field) {
    if (char === "[") {
      depth++;
    } else {
      break;
    }
  }

  // ? ADD validation?

  if (depth > 0) {
    // generate default depth and nullability data for each level

    for (let level = 1; level <= depth; level++) {
      levels.push({
        level,
        nullable: true,
      });
    }

    // map through closing brackets to determine nullability
    let closingBracketCount = 0;

    for (let i = 0; i < field.length; i++) {
      if (field[i] === "]") {
        if (i + 1 <= field.length && field[i + 1] === "!") {
          levels[closingBracketCount].nullable = false;
        }
      }
      closingBracketCount++;

      if (closingBracketCount === levels.length) {
        break;
      }
    }
  }

  return levels;
};

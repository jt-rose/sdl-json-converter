import { Depth } from "./ISchema";
import { findArrayDepth } from "./utils/findArrayDepth";

// nullableRootValue
// nullableResponse

// fieldText format -> "param: String!""
const findTypeData = (fieldText: string) => {
  // for ReturnType fields, name will still be calculated
  // but can simply be ignored
  const name = fieldText.replace(/:.+/, "");
  const type = fieldText.replace(name + ":", "");
  const rootType = type.replace(/\[|\]|!|\s/g, "");
  const nullable = !fieldText.includes(rootType + "!");
  const depth = findArrayDepth(fieldText);

  return {
    name,
    type: rootType,
    nullable,
    depth,
  };
};

export class ReturnField implements ReturnField {
  readonly type: string;
  readonly nullable: boolean;
  readonly depth: Depth[];

  constructor(fieldText: string) {
    const { type, nullable, depth } = findTypeData(fieldText);

    this.type = type;
    this.nullable = nullable;
    this.depth = depth;
  }
}

export class Field extends ReturnField implements Field {
  readonly name: string;

  constructor(fieldText: string) {
    const { name } = findTypeData(fieldText);
    super(fieldText);
    this.name = name;
  }
}

export const sampleField = new Field("nums: [Int!]!");

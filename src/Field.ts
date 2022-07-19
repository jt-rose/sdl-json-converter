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
  private _type: string;
  private _nullable: boolean;
  private _depth: Depth[];

  constructor(fieldText: string) {
    const { type, nullable, depth } = findTypeData(fieldText);

    this._type = type;
    this._nullable = nullable;
    this._depth = depth;
  }

  get type() {
    return this._type;
  }
  get nullable() {
    return this._nullable;
  }
  get depth() {
    return this._depth;
  }
}

export class Field extends ReturnField implements Field {
  private _name: string;

  constructor(fieldText: string) {
    const { name } = findTypeData(fieldText);
    super(fieldText);
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

export const sampleField = new Field("nums: [Int!]!");

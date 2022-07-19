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
  private type: string;
  private nullable: boolean;
  private depth: Depth[];

  constructor(fieldText: string) {
    const { type, nullable, depth } = findTypeData(fieldText);

    this.type = type;
    this.nullable = nullable;
    this.depth = depth;
  }

  public getFieldData() {
    return {
      type: this.type,
      nullable: this.nullable,
      depth: this.depth,
    };
  }
}

export class Field extends ReturnField implements Field {
  private name: string;

  constructor(fieldText: string) {
    const { name } = findTypeData(fieldText);
    super(fieldText);
    this.name = name;
  }

  public getFieldData() {
    const { type, nullable, depth } = super.getFieldData();
    return {
      name: this.name,
      type,
      nullable,
      depth,
    };
  }
}

export const sampleField = new Field("nums: [Int!]!");

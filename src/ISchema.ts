interface Schema {
  interfaces: SchemaInterface[];
  types: Type[];
  unions: Union[];
  enums: Enum[];
  inputs: Input[];
  scalars: Scalar[];
  directives: Directive[];
  queries: Query[];
  mutations: Mutation[];
  subscriptions: Subscription[];
  comments: Comment[];
}

// NOTE: to avoid circular references
// field names will be used
// rather than nested field objects

interface Field {
  name: string;
  type: string; // String, Int, Boolean, [Object], List[], Enum
  nullableResponse: boolean;
  // TODO
  depth: {
    level: number;
    nullable: boolean;
  }[];
  // optional arrayDepth: number
}

type ReturnField = Omit<Field, "name">;

interface Type {
  name: string;
  fields: Field[];
}

interface SchemaInterface extends Type {
  implementedBy: string[];
}
interface Union {
  name: string;
  types: string[];
}
interface Enum {
  name: string;
  values: string[];
}
interface Input {
  name: string;
  fields: Field[];
}
interface Scalar {
  name: string;
}
interface Directive {
  name: string;
  // args // TODO
}
interface Query {
  name: string;
  args: Field[];
  returns: ReturnField;
}
interface Mutation {
  name: string;
  args: Field[];
  returns: ReturnField;
}
interface Subscription {
  name: string;
  // TODO
}
interface Comment {
  text: string;
  // TODO
}

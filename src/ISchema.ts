export interface Schema {
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

export interface Depth {
  level: number;
  nullable: boolean;
}

export interface Field {
  name: string;
  type: string; // String, Int, Boolean, [Object], List[], Enum
  nullable: boolean;
  // TODO
  depth: Depth[];
  // optional arrayDepth: number
}

export type ReturnField = Omit<Field, "name">;

export interface Type {
  name: string;
  fields: Field[];
}

export interface SchemaInterface extends Type {
  implementedBy: string[];
}
export interface Union {
  name: string;
  types: string[];
}
export interface Enum {
  name: string;
  values: string[];
}
export interface Input {
  name: string;
  fields: Field[];
}
export interface Scalar {
  name: string;
}
export interface Directive {
  name: string;
  // args // TODO
}
export interface Query {
  name: string;
  args: Field[];
  returns: ReturnField;
}
export interface Mutation {
  name: string;
  args: Field[];
  returns: ReturnField;
}
export interface Subscription {
  name: string;
  // TODO
}
export interface Comment {
  text: string;
  // TODO
}

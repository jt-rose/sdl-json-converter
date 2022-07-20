import { readFileSync } from "fs";
import {
  Directive,
  Enum,
  Input,
  //Mutation,
  Scalar,
  SchemaInterface,
  Subscription,
  Type,
  Union,
} from "./ISchema";
import { Query } from "./Query";
import { Mutation } from "./Mutation";

export class Schema {
  readonly filePath: string;
  readonly schemaText: string;
  readonly interfaces: SchemaInterface[];
  readonly types: Type[];
  readonly unions: Union[];
  readonly enums: Enum[];
  readonly inputs: Input[];
  readonly scalars: Scalar[];
  readonly directives: Directive[];
  readonly queries: Query[];
  readonly mutations: Mutation[];
  readonly subscriptions: Subscription[];
  readonly comments: Comment[];

  constructor(filePath: string) {
    const schemaText = Schema._readFileContents(filePath);

    this.filePath = filePath;
    this.schemaText = schemaText;
    this.interfaces = []; // TODO
    this.types = []; // TODO
    this.unions = []; // TODO
    this.enums = []; // TODO
    this.inputs = []; // TODO
    this.scalars = []; // TODO
    this.directives = []; // TODO
    this.queries = Query.parse(schemaText);
    this.mutations = Mutation.parse(schemaText);
    this.subscriptions = []; // TODO
    this.comments = []; // TODO
  }

  private static _readFileContents(path: string) {
    try {
      const file = readFileSync(path);
      return file.toString();
    } catch (e) {
      return "ERROR parsing file: " + e;
    }
  }

  static outputJSON(schema: Schema) {
    return JSON.stringify(schema);
  }
}

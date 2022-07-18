import { readFileSync } from "fs";

export class SchemaParser {
  private filePath: string;
  private schemaText: string;
  private interfaces: SchemaInterface[];
  private types: Type[];
  private unions: Union[];
  private enums: Enum[];
  private inputs: Input[];
  private scalars: Scalar[];
  private directives: Directive[];
  private queries: Query[];
  private mutations: Mutation[];
  private subscriptions: Subscription[];
  private comments: Comment[];

  constructor(filePath: string) {
    const schemaText = this.readFileContents(filePath);

    this.filePath = filePath;
    this.schemaText = schemaText;
    this.interfaces = []; // TODO
    this.types = []; // TODO
    this.unions = []; // TODO
    this.enums = []; // TODO
    this.inputs = []; // TODO
    this.scalars = []; // TODO
    this.directives = []; // TODO
    this.queries = []; // TODO
    this.mutations = []; // TODO
    this.subscriptions = []; // TODO
    this.comments = []; // TODO
  }

  private readFileContents(path: string) {
    try {
      const file = readFileSync(path);
      return file.toString();
    } catch (e) {
      return "ERROR parsing file: " + e;
    }
  }

  public getSchemaData() {
    return {
      filePath: this.filePath,
      schemaText: this.schemaText,
      interfaces: this.interfaces,
      types: this.types,
      unions: this.unions,
      enums: this.enums,
      inputs: this.inputs,
      scalars: this.scalars,
      directives: this.directives,
      queries: this.queries,
      mutations: this.mutations,
      subscriptions: this.subscriptions,
      comments: this.comments,
    };
  }
}

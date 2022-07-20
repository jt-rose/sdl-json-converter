import { Field, ReturnField } from "./Field";
import { parseSection } from "./utils/findSection";

export type RequestType = "Query" | "Mutation";

export abstract class Request {
  readonly name: string;
  readonly args: Field[];
  readonly returns: ReturnField;

  constructor(text: string) {
    // divide "hello(name: String!): String!" into three sections
    const name = text.match(/[^\(:]+/); // may refactor to use rxp
    const args = text.match(/\([^\)]+\)/); // need to replace ( and )
    const returns = text.replace(/.+:/, "").trim();

    if (!name || !returns) {
      throw Error("Invalid format for query");
    }

    let fmtArgs: Field[] = [];

    if (args) {
      fmtArgs = args[0]
        .replace(/\(|\)/g, "")
        .split(",")
        .map((argument) => argument.trim())
        .map((argument) => new Field(argument));
    }

    // ! CHECK FOR ERRORS !!!

    const returnField = new ReturnField(returns);

    this.name = name[0];
    this.args = fmtArgs;
    this.returns = returnField;
  }

  static parseRequests(schemaText: string, requestType: RequestType) {
    const section = parseSection(requestType)(schemaText);

    if (!section) {
      return [];
    }

    // get individual lines
    const lines = section.split(/\r?\n/).map((line) => line.trim());

    const requests = lines.slice(1, lines.length - 1);
    // TODO - remove comments, directives

    // remove opening and closing lines and return
    // ! NOTE: this assumes valid format - throw error on invalid
    // ! such as query defined across 2 lines?
    return requests;
  }
}

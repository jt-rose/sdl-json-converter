import { Field, ReturnField } from "./Field";
import { parseQueries } from "./utils/findSection";

export class Query {
  name: string;
  args: Field[];
  returns: ReturnField;

  constructor(queryText: string) {
    // divide "hello(name: String!): String!" into three sections
    const name = queryText.match(/[^\(:]+/); // may refactor to use rxp
    const args = queryText.match(/\([^\)]+\)/); // need to replace ( and )
    const returns = queryText.replace(/.+:/, "").trim();

    if (!name || !returns) {
      throw Error("Invalid format for query");
    }

    // ! VALIDATE ???
    // const returnType = returns
    //   .replace(/\[/g, "")
    //   .replace(/\]!/g, "")
    //   .replace(/\]/g, "")
    //   .trim();
    // const returnIsNullable = !returnType.includes("!");
    // const returnFieldDepth = findArrayDepth(returns[0]);
    // const returnField: ReturnField = {
    //   type: returnType.replace("!", ""),
    //   nullableResponse: returnIsNullable,
    //   depth: returnFieldDepth,
    // };

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

  // generates query objects from schema text
  static parse(schemaText: string) {
    const querySection = parseQueries(schemaText);

    if (!querySection) {
      return [];
    }

    // get individual lines
    const lines = querySection.split(/\r?\n/).map((line) => line.trim());

    const queries = lines.slice(1, lines.length - 1);
    // TODO - remove comments, directives

    // remove opening and closing lines and return
    // ! NOTE: this assumes valid format - throw error on invalid
    // ! such as query defined across 2 lines?
    return queries.map((q) => new Query(q));
  }
}

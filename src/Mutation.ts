import { Request, RequestType } from "./Request";

export class Mutation extends Request {
  private static _requestType: RequestType = "Mutation";

  // generates Mutation objects from schema text
  static parse(schemaText: string) {
    const requests = super.parseRequests(schemaText, this._requestType);
    return requests.map((req) => new Mutation(req));
  }
}

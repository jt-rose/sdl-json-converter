import { Request, RequestType } from "./Request";

export class Query extends Request {
  private static _requestType: RequestType = "Query";

  // generates Query objects from schema text
  static parse(schemaText: string) {
    const requests = super.parseRequests(schemaText, this._requestType);
    return requests.map((req) => new Query(req));
  }
}

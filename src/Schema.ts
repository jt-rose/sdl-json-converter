import { readFileSync } from "fs";
import {
  Directive,
  Enum,
  Input,
  Mutation,
  Scalar,
  SchemaInterface,
  Subscription,
  Type,
  Union,
} from "./ISchema";
import { Query } from "./Query";

export class Schema {
  private _filePath: string;
  private _schemaText: string;
  private _interfaces: SchemaInterface[];
  private _types: Type[];
  private _unions: Union[];
  private _enums: Enum[];
  private _inputs: Input[];
  private _scalars: Scalar[];
  private _directives: Directive[];
  private _queries: Query[];
  private _mutations: Mutation[];
  private _subscriptions: Subscription[];
  private _comments: Comment[];

  get filePath() {
    return this._filePath;
  }
  get schemaText() {
    return this._schemaText;
  }
  get interfaces() {
    return this._interfaces;
  }
  get types() {
    return this._types;
  }
  get unions() {
    return this._unions;
  }
  get enums() {
    return this._enums;
  }
  get inputs() {
    return this._inputs;
  }
  get scalars() {
    return this._scalars;
  }
  get directives() {
    return this._directives;
  }
  get queries() {
    return this._queries;
  }
  get mutations() {
    return this._mutations;
  }
  get subscriptions() {
    return this._subscriptions;
  }
  get comments() {
    return this._comments;
  }

  constructor(filePath: string) {
    const schemaText = this._readFileContents(filePath);

    const queries = Query.parse(schemaText);

    this._filePath = filePath;
    this._schemaText = schemaText;
    this._interfaces = []; // TODO
    this._types = []; // TODO
    this._unions = []; // TODO
    this._enums = []; // TODO
    this._inputs = []; // TODO
    this._scalars = []; // TODO
    this._directives = []; // TODO
    this._queries = queries;
    this._mutations = []; // TODO
    this._subscriptions = []; // TODO
    this._comments = []; // TODO
  }

  private _readFileContents(path: string) {
    try {
      const file = readFileSync(path);
      return file.toString();
    } catch (e) {
      return "ERROR parsing file: " + e;
    }
  }
}

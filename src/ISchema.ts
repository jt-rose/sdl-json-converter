interface Schema {
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

interface Type {}
interface Union {}
interface Enum {}
interface Input {}
interface Scalar {}
interface Directive {}
interface Query {}
interface Mutation {}
interface Subscription {}
interface Comment {}

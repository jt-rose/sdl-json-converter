import path from "path";
import { Schema } from "./Schema";

// sample file
const file = path.join("./schema.graphql");

const schema = new Schema(file);
schema.queries.forEach((q) => console.log(q));
schema.mutations.forEach((m) => console.log(m));
console.log(Schema.outputJSON(schema));

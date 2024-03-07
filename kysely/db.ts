import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@auth/kysely-adapter";

export const dialect = new PostgresDialect({
  pool: new Pool({
    database: "Chemicalshop",
    host: "localhost",
    user: "peyman",
    password: "3030642711",
    port: 5432,
    max: 10,
  }),
});
export const db = new Kysely<Database>({
  dialect: dialect,
});

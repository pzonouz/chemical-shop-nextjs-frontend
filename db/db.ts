import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "peyman",
  password: "3030642711",
  database: "Chemicalshop",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("Connection to database was successful");
});

export const query = pool.query;

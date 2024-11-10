import { createPool } from "mysql2/promise";
import { DB_DATABASE1, DB_HOST1, DB_PASSWORD1, DB_PORT1, DB_USER1 } from "./configAMD.js";

export const pool1 = createPool({
    host: DB_HOST1,
    user: DB_USER1,
    password: DB_PASSWORD1,
    port: DB_PORT1,
    database: DB_DATABASE1
});

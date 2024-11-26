import { Pool } from "pg";

import {
  PG_DATABASE,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USER,
} from "../config/config";

export const pool = new Pool({
  database: PG_DATABASE,
  host: PG_HOST,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
  user: PG_USER,
});

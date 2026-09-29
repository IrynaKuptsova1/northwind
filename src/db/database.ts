import { drizzle } from "drizzle-orm/d1";
import type { D1Database } from "@cloudflare/workers-types";

export type Env = {
  DB: D1Database;
};

export function getDb(env: Env) {
  return drizzle(env.DB);
}

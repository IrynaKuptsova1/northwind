import { drizzle } from "drizzle-orm/d1";
import { Env } from "hono";

export type Env = {
  DB: D1Database;
};

// export function getDb(env: Env) {
export function getDb(env: Env) {
  return drizzle(env.DB);
}


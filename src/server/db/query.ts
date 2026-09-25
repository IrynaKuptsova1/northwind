import { count } from "drizzle-orm";
import { getDb, type Env } from "./database";
import { products } from "./schema";

export async function getProducts(env: Env, limit: number, offset: number) {
  const db = getDb(env);

  const [{ total }] = await db.select({ total: count() }).from(products);
  const data = await db.select().from(products).limit(limit).offset(offset);

  return { total, data };
}

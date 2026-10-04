import { drizzle } from "drizzle-orm/d1";
import { getPlatformProxy } from "wrangler";

import { Env } from ".";
import { getProducts } from "./db/query";
import { products } from "./db/schema";

// Manual query smoke tests against the remote D1 from wrangler.jsonc ("remote": true).
// Run with Node, not Bun (Bun hangs while wrangler opens the remote session):
//   npx tsx src/test-my-queries.ts
const { env, dispose } = await getPlatformProxy<Env>();
const db = drizzle(env.DB);

try {
  // ad-hoc drizzle query
  console.table(await db.select().from(products).limit(5));

  // or call your query functions with the same env the Worker gets
  console.dir(await getProducts(db, 20, 0), { depth: null });
} finally {
  await dispose();
}

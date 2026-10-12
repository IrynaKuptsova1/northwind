import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { sql, count, eq, sum } from "drizzle-orm";
import { getPlatformProxy } from "wrangler";

import { Env } from ".";
import {
  getProducts,
  getSuppliers,
  getCustomers,
  getOrders,
  getEmployees,
  getProductById,
} from "./db/query";
import {
  products,
  suppliers,
  customers,
  orders,
  orderDetails,
  employees,
} from "./db/schema";

// Manual query smoke tests against the remote D1 from wrangler.jsonc ("remote": true).
// Run with Node, not Bun (Bun hangs while wrangler opens the remote session):
//   npx tsx src/test-my-queries.ts
const { env, dispose } = await getPlatformProxy<Env>();
const db = drizzle(env.DB);

try {
  // ad-hoc drizzle query
  //console.table(await db.select().from(products).limit(5));

  // or call your query functions with the same env the Worker gets
  //console.dir(await getProducts(db, 20, 0));
  //console.dir(await getSuppliers(db, 20, 0));
  //console.dir(await getCustomers(db, 20, 0));

  

  console.dir(await getProductById(db, 1));
} finally {
  await dispose();
}

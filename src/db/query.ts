import { count } from "drizzle-orm";

import { DrizzleD1Database } from "drizzle-orm/d1";
import { products } from "./schema";

export async function getProducts(db: DrizzleD1Database
  , limit: number, offset: number) {


  const data = await db
    .select({
      total: count(),
      productId: products.productId,
    })
    .from(products)
    .limit(limit)
    .offset(offset);

  return { data };
}

// export async function getTotal(env:Env) {
//   const db = getDb(env);
//   const

// }

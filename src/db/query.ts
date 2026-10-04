import { count } from "drizzle-orm";
import { getDb, type Env } from "./database";
import { products } from "./schema";

export async function getProducts(env: Env, limit: number, offset: number) {
  const db = getDb(env);

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

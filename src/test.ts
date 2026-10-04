import { drizzle } from "drizzle-orm/d1";
import { products } from "./db/schema";

async function testQueries(env) {
  const db = drizzle(env.DB);

  const result = await db.select().from(products).limit(20);

  console.log(result);
}

import { D1Database } from "@cloudflare/workers-types";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { Hono } from "hono";
import { getProducts } from "./db/query";

type Env = {
  Bindings: { DB: D1Database };
  Variables: { db: DrizzleD1Database };
};

const dataRoutes = new Hono<Env>();

dataRoutes.use(async (c, next) => {
  const db = drizzle(c.env.DB)
  c.set("db", db);

  return await next();
});

dataRoutes.get("/products", async (c) => {
  const limit = Number(c.req.query("limit") ?? 20);
  const offset = Number(c.req.query("offset") ?? 0);

  const result = await getProducts(c.get("db"), limit, offset);

  return c.json(result);
});

export default dataRoutes;

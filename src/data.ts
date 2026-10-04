import { Hono } from "hono";
import { getProducts } from "./db/query";
import { D1Database } from "@cloudflare/workers-types";

type Env = {
  Bindings: { DB: D1Database };
  Variables: { db: D1Database };
};

const dataRoutes = new Hono<Env>();

dataRoutes.use(async (c, next) => {
  const db = c.env.DB;
  c.set("db", db);

  return await next();
});

dataRoutes.get("/products", async (c) => {
  const db = c.env.DB;
  const limit = Number(c.req.query("limit") ?? 20);
  const offset = Number(c.req.query("offset") ?? 0);

  const result = await getProducts(c.env, limit, offset);

  return c.json(result);
});

export default dataRoutes;

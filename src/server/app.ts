import { Hono } from "hono";
import { cors } from "hono/cors";

import { getProducts } from "./db/query";
import type { Env } from "./db/database";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/products.data", async (c) => {
  const limit = Number(c.req.query("limit") ?? 20);
  const offset = Number(c.req.query("offset") ?? 0);

  const result = await getProducts(c.env, limit, offset);

  return c.json(result);
});

export default app;

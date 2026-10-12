import { D1Database } from "@cloudflare/workers-types";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { Hono } from "hono";
import { getProducts, getProductById, getSupplierById } from "./db/query";

type Env = {
  Bindings: { DB: D1Database };
  Variables: { db: DrizzleD1Database };
};

const dataRoutes = new Hono<Env>();

dataRoutes.use(async (c, next) => {
  const db = drizzle(c.env.DB);
  c.set("db", db);

  return await next();
});

dataRoutes.get("/products", async (c) => {
  const limit = Number(c.req.query("limit") ?? 20);
  const offset = Number(c.req.query("offset") ?? 0);

  if ( !Number.isInteger(limit) || limit <= 0 || !Number.isInteger(offset) || offset < 0) 
    {return c.json({ error: "Invalid limit or offset" }, 400);}

  const result = await getProducts(c.get("db"), limit, offset);
  return c.json(result);
});

dataRoutes.get("/products/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    return c.json({ error: "Invalid product ID" }, 400);
  }
  const product = await getProductById(c.get("db"), id);
  if (!product) {
    return c.json({ error: "Product not found" }, 404);
  }
  return c.json(product);
});

dataRoutes.get("/suppliers/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id) || id <= 0) {
    return c.json({ error: "Invalid supplier ID" }, 400);
  }
  const supplier = await getSupplierById(c.get("db"), id);
  if (!supplier) {
    return c.json({ error: "Supplier not found" }, 404);
  }
  return c.json(supplier);
});

export default dataRoutes;

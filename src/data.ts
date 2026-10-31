import { D1Database } from "@cloudflare/workers-types";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { Hono } from "hono";
import {
  getProducts,
  getProductById,
  getSupplierById,
  getSuppliers,
  getOrders,
  getCustomers,
  getEmployees,
  getOrderById,
  getCustomerById,
  getEmployeeById,
} from "./db/query";

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

function parseInteger(value: string): number {
  return /^[0-9]+$/.test(value) ? Number(value) : NaN;
}

dataRoutes.get("/products", async (c) => {
  const limit = parseInteger(c.req.query("limit") ?? "20");
  const offset = parseInteger(c.req.query("offset") ?? "0");

  if (
    !Number.isSafeInteger(limit) ||
    limit <= 0 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return c.json({ error: "Invalid limit or offset" }, 400);
  }

  const result = await getProducts(c.get("db"), limit, offset);
  return c.json(result);
});

dataRoutes.get("/product/:id", async (c) => {
  const id = parseInteger(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid product ID" }, 400);
  }
  const product = await getProductById(c.get("db"), id);
  if (!product) {
    return c.json({ error: "Product not found" }, 404);
  }
  return c.json(product);
});
dataRoutes.get("/suppliers", async (c) => {
  const limit = parseInteger(c.req.query("limit") ?? "20");
  const offset = parseInteger(c.req.query("offset") ?? "0");

  if (
    !Number.isSafeInteger(limit) ||
    limit <= 0 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return c.json({ error: "Invalid limit or offset" }, 400);
  }

  const result = await getSuppliers(c.get("db"), limit, offset);
  return c.json(result);
});
dataRoutes.get("/supplier/:id", async (c) => {
  const id = parseInteger(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid supplier ID" }, 400);
  }
  const supplier = await getSupplierById(c.get("db"), id);
  if (!supplier) {
    return c.json({ error: "Supplier not found" }, 404);
  }
  return c.json(supplier);
});

dataRoutes.get("/customers", async (c) => {
  const limit = parseInteger(c.req.query("limit") ?? "20");
  const offset = parseInteger(c.req.query("offset") ?? "0");

  if (
    !Number.isSafeInteger(limit) ||
    limit <= 0 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return c.json({ error: "Invalid limit or offset" }, 400);
  }

  const result = await getCustomers(c.get("db"), limit, offset);

  return c.json(result);
});

dataRoutes.get("/employees", async (c) => {
  const limit = parseInteger(c.req.query("limit") ?? "20");
  const offset = parseInteger(c.req.query("offset") ?? "0");

  if (
    !Number.isSafeInteger(limit) ||
    limit <= 0 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return c.json({ error: "Invalid limit or offset" }, 400);
  }

  const result = await getEmployees(c.get("db"), limit, offset);

  return c.json(result);
});

dataRoutes.get("/orders", async (c) => {
  const limit = parseInteger(c.req.query("limit") ?? "20");
  const offset = parseInteger(c.req.query("offset") ?? "0");

  if (
    !Number.isSafeInteger(limit) ||
    limit <= 0 ||
    !Number.isSafeInteger(offset) ||
    offset < 0
  ) {
    return c.json({ error: "Invalid limit or offset" }, 400);
  }

  const result = await getOrders(c.get("db"), limit, offset);

  return c.json(result);
});
dataRoutes.get("/order/:id", async (c) => {
  const id = parseInteger(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid order ID" }, 400);
  }
  const order = await getOrderById(c.get("db"), id);
  if (!order) {
    return c.json({ error: "Order not found" }, 404);
  }
  return c.json(order);
});

dataRoutes.get("/customer/:id", async (c) => {
  const id = c.req.param("id");
  // Customer IDs are text keys, unlike the numeric IDs in other tables.
  if (!id || /[\s\u0000-\u001f\u007f]/u.test(id)) {
    return c.json({ error: "Invalid customer ID" }, 400);
  }
  const customer = await getCustomerById(c.get("db"), id);
  if (!customer) {
    return c.json({ error: "Customer not found" }, 404);
  }
  return c.json(customer);
});

dataRoutes.get("/employee/:id", async (c) => {
  const id = parseInteger(c.req.param("id"));
  if (!Number.isSafeInteger(id) || id <= 0) {
    return c.json({ error: "Invalid employee ID" }, 400);
  }
  const employee = await getEmployeeById(c.get("db"), id);
  if (!employee) {
    return c.json({ error: "Employee not found" }, 404);
  }
  return c.json(employee);
});

export default dataRoutes;

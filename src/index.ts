import { Hono } from "hono";
import { cors } from "hono/cors";

import { getProducts } from "./db/query";
import type { Env } from "./db/database";
import dataRoutes from "./data";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/health", async (c) => {
  return c.json("ok");
});

app.route("/data", dataRoutes);

export default app;

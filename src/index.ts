import { Hono } from "hono";
import { cors } from "hono/cors";

import { D1Database } from "@cloudflare/workers-types";
import dataRoutes from "./data";
export type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/health", async (c) => {
  return c.json("ok");
});

app.route("/data", dataRoutes);



export default app;

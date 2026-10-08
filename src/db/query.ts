import { DrizzleD1Database } from "drizzle-orm/d1";
import {
  products,
  suppliers,
  customers,
  orders,
  orderDetails,
  employees,
} from "./schema";
import { sql, count, eq, sum } from "drizzle-orm";
export async function getSuppliers(
  db: DrizzleD1Database,
  limit: number,
  offset: number,
) {
  const result = await db
    .select({
      companyName: suppliers.companyName,
      contactName: suppliers.contactName,
      contactTitle: suppliers.contactTitle,
      city: suppliers.city,
      country: suppliers.country,
      total: db.$count(suppliers),
    })
    .from(suppliers)
    .limit(limit)
    .offset(offset);

  return { result };
}
export async function getProducts(
  db: DrizzleD1Database,
  limit: number,
  offset: number,
) {
  const result = await db
    .select({
      productName: products.productName,
      productsPrice: products.unitPrice,
      productsStock: products.unitsInStock,
      productsOrder: products.unitsOnOrder,
      total: db.$count(products),
    })
    .from(products)
    .limit(limit)
    .offset(offset);

  return { result };
}

export async function getOrders(
  db: DrizzleD1Database,
  limit: number,
  offset: number,
) {
  const result = await db
    .select({
      orderId: orders.orderId,
      totalPrice: sql<number>`
      ROUND(SUM(${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount})),2)`,
      products: count(orderDetails.productId),
      quantity: sum(orderDetails.quantity),
      shipped: orders.shippedDate,
      shipName: orders.shipName,
      city: orders.shipCity,
      country: orders.shipCountry,
      total: db.$count(orders),
    })
    .from(orders)
    .innerJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
    .groupBy(orders.orderId)
    .limit(limit)
    .offset(offset);

  return { result };
}

export async function getEmployees(
  db: DrizzleD1Database,
  limit: number,
  offset: number,
) {
  const result = await db
    .select({
      name: sql<string>`${employees.firstName} || ' ' || ${employees.lastName}`,
      title: employees.title,
      city: employees.city,
      phone: employees.homePhone,
      country: employees.country,
      total: db.$count(employees),
    })
    .from(employees)
    .limit(limit)
    .offset(offset);

  return { result };
}

export async function getCustomers(
  db: DrizzleD1Database,
  limit: number,
  offset: number,
) {
  const result = await db
    .select({
      companyName: customers.companyName,
      contactName: customers.contactName,
      contactTitle: customers.contactTitle,
      city: customers.city,
      country: customers.country,
      total: db.$count(customers),
    })
    .from(customers)
    .limit(limit)
    .offset(offset);

  return { result };
}

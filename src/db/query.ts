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
      supplierId: suppliers.supplierId,
      companyName: suppliers.companyName,
      contactName: suppliers.contactName,
      contactTitle: suppliers.contactTitle,
      city: suppliers.city,
      country: suppliers.country,
      total: db.$count(suppliers),
    })
    .from(suppliers)
    .orderBy(suppliers.supplierId)
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
      productId: products.productId,
      productName: products.productName,
      quantityPerUnit: products.quantityPerUnit,
      unitPrice: products.unitPrice,
      unitsInStock: products.unitsInStock,
      unitsOnOrder: products.unitsOnOrder,
      total: db.$count(products),
    })
    .from(products)
    .orderBy(products.productId)
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
      totalPrice: sql<number | null>`
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
    .leftJoin(orderDetails, eq(orderDetails.orderId, orders.orderId))
    .groupBy(orders.orderId)
    .orderBy(orders.orderId)
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
      employeeId: employees.employeeId,
      name: sql<
        string | null
      >`${employees.firstName} || ' ' || ${employees.lastName}`,
      title: employees.title,
      city: employees.city,
      phone: employees.homePhone,
      country: employees.country,
      total: db.$count(employees),
    })
    .from(employees)
    .orderBy(employees.employeeId)
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
      customerId: customers.customerId,
      companyName: customers.companyName,
      contactName: customers.contactName,
      contactTitle: customers.contactTitle,
      city: customers.city,
      country: customers.country,
      total: db.$count(customers),
    })
    .from(customers)
    .orderBy(customers.customerId)
    .limit(limit)
    .offset(offset);

  return { result };
}
export async function getProductById(db: DrizzleD1Database, productId: number) {
  const result = await db
    .select({
      productId: products.productId,
      productName: products.productName,
      supplierId: products.supplierId,
      supplierName: suppliers.companyName,
      quantityPerUnit: products.quantityPerUnit,
      unitPrice: products.unitPrice,
      unitsInStock: products.unitsInStock,
      unitsOnOrder: products.unitsOnOrder,
      reorderLevel: products.reorderLevel,
      discontinued: products.discontinued,
    })
    .from(products)
    .leftJoin(suppliers, eq(products.supplierId, suppliers.supplierId))
    .where(eq(products.productId, productId))
    .limit(1);

  return result[0] ?? null;
}
export async function getSupplierById(
  db: DrizzleD1Database,
  supplierId: number,
) {
  const result = await db
    .select({
      supplierId: suppliers.supplierId,
      companyName: suppliers.companyName,
      contactName: suppliers.contactName,
      contactTitle: suppliers.contactTitle,
      address: suppliers.address,
      city: suppliers.city,
      region: suppliers.region,
      postalCode: suppliers.postalCode,
      country: suppliers.country,
      phone: suppliers.phone,
      fax: suppliers.fax,
      homePage: suppliers.homePage,
    })
    .from(suppliers)
    .where(eq(suppliers.supplierId, supplierId))
    .limit(1);

  return result[0] ?? null;
}

export async function getCustomerById(
  db: DrizzleD1Database,
  customerId: string,
) {
  const result = await db
    .select()
    .from(customers)
    .where(eq(customers.customerId, customerId))
    .limit(1);
  return result[0] ?? null;
}

export async function getEmployeeById(
  db: DrizzleD1Database,
  employeeId: number,
) {
  const result = await db
    .select()
    .from(employees)
    .where(eq(employees.employeeId, employeeId))
    .limit(1);
  return result[0] ?? null;
}

export async function getOrderById(db: DrizzleD1Database, orderId: number) {
  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.orderId, orderId))
    .limit(1);
  const order = result[0];
  if (!order) return null;

  const items = await db
    .select({
      productId: orderDetails.productId,
      productName: products.productName,
      unitPrice: orderDetails.unitPrice,
      quantity: orderDetails.quantity,
      discount: orderDetails.discount,
      totalPrice: sql<
        number | null
      >`${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount})`,
    })
    .from(orderDetails)
    .leftJoin(products, eq(orderDetails.productId, products.productId))
    .where(eq(orderDetails.orderId, orderId))
    .orderBy(orderDetails.productId);

  const totals = await db
    .select({
      totalPrice: sql<
        number | null
      >`ROUND(SUM(${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount})), 2)`,
    })
    .from(orderDetails)
    .where(eq(orderDetails.orderId, orderId));

  return { ...order, items, totalPrice: totals[0]?.totalPrice ?? null };
}

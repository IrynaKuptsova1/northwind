import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  categoryId: integer("category_id").primaryKey(),
  categoryName: text("category_name").notNull(),
  description: text("description"),
});

export const customers = sqliteTable("customers", {
  customerId: text("customer_id").primaryKey(),
  companyName: text("company_name"),
  contactName: text("contact_name"),
  contactTitle: text("contact_title"),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  postalCode: text("postal_code"),
  country: text("country"),
  phone: text("phone"),
  fax: text("fax"),
});

export const employees = sqliteTable("employees", {
  employeeId: integer("employee_id").primaryKey(),
  lastName: text("last_name"),
  firstName: text("first_name"),
  title: text("title"),
  titleOfCourtesy: text("title_of_courtesy"),
  birthDate: text("birth_date"),
  hireDate: text("hire_date"),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  postalCode: text("postal_code"),
  country: text("country"),
  homePhone: text("home_phone"),
  extension: text("extension"),
  notes: text("notes"),
  reportsTo: integer("reports_to"),
});

export const employeeTerritories = sqliteTable("employee_territories", {
  employeeId: integer("employee_id").notNull(),
  territoryId: text("territory_id").notNull(),
});
export const orderDetails = sqliteTable("order_details", {
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  unitPrice: real("unit_price"),
  quantity: integer("quantity"),
  discount: real("discount"),
});
export const orders = sqliteTable("orders", {
  orderId: integer("order_id").primaryKey(),
  customerId: text("customer_id"),
  employeeId: integer("employee_id"),
  orderDate: text("order_date"),
  requiredDate: text("required_date"),
  shippedDate: text("shipped_date"),
  shipVia: integer("ship_via"),
  freight: real("freight"),
  shipName: text("ship_name"),
  shipAddress: text("ship_address"),
  shipCity: text("ship_city"),
  shipRegion: text("ship_region"),
  shipPostalCode: text("ship_postal_code"),
  shipCountry: text("ship_country"),
});
export const products = sqliteTable("products", {
  productId: integer("product_id").primaryKey(),
  productName: text("product_name"),
  supplierId: integer("supplier_id"),
  categoryId: integer("category_id"),
  quantityPerUnit: text("quantity_per_unit"),
  unitPrice: real("unit_price"),
  unitsInStock: integer("units_in_stock"),
  unitsOnOrder: integer("units_on_order"),
  reorderLevel: integer("reorder_level"),
  discontinued: integer("discontinued"),
});
export const regions = sqliteTable("regions", {
  regionId: integer("region_id").primaryKey(),
  regionDescription: text("region_description"),
});


export const shippers = sqliteTable("shippers", {
  shipperId: integer("shipper_id").primaryKey(),
  companyName: text("company_name"),
  phone: text("phone"),
});

export const suppliers = sqliteTable("suppliers", {
  supplierId: integer("supplier_id").primaryKey(),
  companyName: text("company_name"),
  contactName: text("contact_name"),
  contactTitle: text("contact_title"),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  postalCode: text("postal_code"),
  country: text("country"),
  phone: text("phone"),
  fax: text("fax"),
  homePage: text("home_page"),
});
export const territories = sqliteTable("territories", {
  territoryId: text("territory_id").primaryKey(),
  territoryDescription: text("territory_description"),
  regionId: integer("region_id"),
});
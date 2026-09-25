CREATE TABLE `categories` (
	`category_id` integer PRIMARY KEY NOT NULL,
	`category_name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`customer_id` text PRIMARY KEY NOT NULL,
	`company_name` text,
	`contact_name` text,
	`contact_title` text,
	`address` text,
	`city` text,
	`region` text,
	`postal_code` text,
	`country` text,
	`phone` text,
	`fax` text
);
--> statement-breakpoint
CREATE TABLE `employee_territories` (
	`employee_id` integer NOT NULL,
	`territory_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`employee_id` integer PRIMARY KEY NOT NULL,
	`last_name` text,
	`first_name` text,
	`title` text,
	`title_of_courtesy` text,
	`birth_date` text,
	`hire_date` text,
	`address` text,
	`city` text,
	`region` text,
	`postal_code` text,
	`country` text,
	`home_phone` text,
	`extension` text,
	`notes` text,
	`reports_to` integer
);
--> statement-breakpoint
CREATE TABLE `order_details` (
	`order_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`unit_price` real,
	`quantity` integer,
	`discount` real
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`order_id` integer PRIMARY KEY NOT NULL,
	`customer_id` text,
	`employee_id` integer,
	`order_date` text,
	`required_date` text,
	`shipped_date` text,
	`ship_via` integer,
	`freight` real,
	`ship_name` text,
	`ship_address` text,
	`ship_city` text,
	`ship_region` text,
	`ship_postal_code` text,
	`ship_country` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`product_name` text,
	`supplier_id` integer,
	`category_id` integer,
	`quantity_per_unit` text,
	`unit_price` real,
	`units_in_stock` integer,
	`units_on_order` integer,
	`reorder_level` integer,
	`discontinued` integer
);
--> statement-breakpoint
CREATE TABLE `regions` (
	`region_id` integer PRIMARY KEY NOT NULL,
	`region_description` text
);
--> statement-breakpoint
CREATE TABLE `shippers` (
	`shipper_id` integer PRIMARY KEY NOT NULL,
	`company_name` text,
	`phone` text
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`supplier_id` integer PRIMARY KEY NOT NULL,
	`company_name` text,
	`contact_name` text,
	`contact_title` text,
	`address` text,
	`city` text,
	`region` text,
	`postal_code` text,
	`country` text,
	`phone` text,
	`fax` text,
	`home_page` text
);
--> statement-breakpoint
CREATE TABLE `territories` (
	`territory_id` text PRIMARY KEY NOT NULL,
	`territory_description` text,
	`region_id` integer
);

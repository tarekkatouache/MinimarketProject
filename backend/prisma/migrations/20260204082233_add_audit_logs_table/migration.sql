-- AlterTable
ALTER TABLE "products" ADD COLUMN "updated_at" DATETIME;

-- CreateTable
CREATE TABLE "scan_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barcode" TEXT NOT NULL,
    "product_id" INTEGER,
    "user_id" INTEGER,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "scan_logs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "scan_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entity" TEXT NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "changes" TEXT,
    "user_id" INTEGER,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sale_id" INTEGER NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'CASH',
    "amount" DECIMAL NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PAID',
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "payments_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_payments" ("amount", "created_at", "id", "method", "reference", "sale_id", "status") SELECT "amount", "created_at", "id", coalesce("method", 'CASH') AS "method", "reference", "sale_id", coalesce("status", 'PAID') AS "status" FROM "payments";
DROP TABLE "payments";
ALTER TABLE "new_payments" RENAME TO "payments";
CREATE TABLE "new_sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "receipt_number" TEXT NOT NULL,
    "total_amount" DECIMAL NOT NULL,
    "net_amount" DECIMAL,
    "discount" DECIMAL DEFAULT 0,
    "payment_method" TEXT NOT NULL DEFAULT 'CASH',
    "payment_status" TEXT NOT NULL DEFAULT 'PAID',
    "cashier_id" INTEGER,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sales_cashier_id_fkey" FOREIGN KEY ("cashier_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
);
INSERT INTO "new_sales" ("cashier_id", "created_at", "discount", "id", "net_amount", "payment_method", "payment_status", "receipt_number", "total_amount") SELECT "cashier_id", "created_at", "discount", "id", "net_amount", "payment_method", coalesce("payment_status", 'PAID') AS "payment_status", "receipt_number", "total_amount" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_sales_1" ON "sales"("receipt_number");
Pragma writable_schema=0;
CREATE INDEX "sales_created_at_idx" ON "sales"("created_at");
CREATE INDEX "sales_cashier_id_idx" ON "sales"("cashier_id");
CREATE INDEX "sales_payment_status_idx" ON "sales"("payment_status");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CASHIER',
    "is_active" BOOLEAN DEFAULT true,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME,
    "email" TEXT,
    "phone" TEXT,
    "updated_at" DATETIME
);
INSERT INTO "new_user" ("created_at", "first_name", "id", "is_active", "last_name", "password_hash", "role", "username") SELECT "created_at", "first_name", "id", "is_active", "last_name", "password_hash", "role", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_1" ON "user"("username");
Pragma writable_schema=0;
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE INDEX "user_role_idx" ON "user"("role");
CREATE INDEX "user_is_active_idx" ON "user"("is_active");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- CreateIndex
CREATE INDEX "products_is_active_idx" ON "products"("is_active");

-- CreateIndex
CREATE INDEX "products_barcode_idx" ON "products"("barcode");

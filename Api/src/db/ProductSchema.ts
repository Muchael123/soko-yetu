import { integer, pgTable, varchar, doublePrecision, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const ProductsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
  image:varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export const CreateProductSchema = createInsertSchema(ProductsTable).omit({
  id: true,
});
export const UpdateProductSchema = createInsertSchema(ProductsTable).omit({
  id: true,
}).partial();

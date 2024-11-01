
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";


export const UsersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),

  name: varchar({ length: 255 }),
  address: text(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),
});
export const createUserSchema = createInsertSchema(UsersTable).omit({
    id: true,
    role: true,
})
export const LoginSchema = createInsertSchema(UsersTable).pick({
  email: true,
  password: true
});
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  credets: integer("credets").default(5)
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

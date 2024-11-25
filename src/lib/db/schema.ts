import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ProjectLinks } from "../utils/types";

export const experiencesTable = pgTable("experiences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  start_date: varchar({ length: 255 }).notNull(),
  end_date: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  institute: varchar({ length: 255 }).notNull(),
  institute_link: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }).notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  shortDescription: varchar({ length: 1000 }).notNull(),
  longDescription: varchar({ length: 2000 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  links: jsonb("links").$type<ProjectLinks>().notNull(),
  technologies: varchar({ length: 255 }).array(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

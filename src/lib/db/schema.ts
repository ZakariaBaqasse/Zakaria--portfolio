import {
  boolean,
  integer,
  jsonb,
  pgTable,
  timestamp,
  text,
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
  longDescription: varchar({ length: 2000 }),
  image: varchar({ length: 255 }),
  demoVideo: varchar({ length: 500 }),
  comingSoon: boolean().default(false),
  links: jsonb("links").$type<ProjectLinks>().notNull(),
  technologies: varchar({ length: 255 }).array(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const articlesTable = pgTable("articles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  excerpt: varchar({ length: 500 }).notNull(),
  body: text().notNull(),
  tags: varchar({ length: 255 }).array(),
  cover_image_url: varchar({ length: 500 }),
  published: boolean().default(false).notNull(),
  published_at: timestamp("published_at", { precision: 3, mode: "string" }),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

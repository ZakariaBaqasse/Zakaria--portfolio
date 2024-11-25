ALTER TABLE "projects" RENAME COLUMN "description" TO "shortDescription";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "longDescription" varchar(2000) NOT NULL;
ALTER TABLE "projects" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "comingSoon" boolean DEFAULT false;
CREATE TABLE IF NOT EXISTS "articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" varchar(500) NOT NULL,
	"body" text NOT NULL,
	"tags" varchar(255)[],
	"cover_image_url" varchar(500),
	"published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp(3),
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);

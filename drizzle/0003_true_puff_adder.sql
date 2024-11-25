CREATE TABLE IF NOT EXISTS "projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"image" varchar(255) NOT NULL,
	"links" jsonb NOT NULL,
	"technologies" varchar(255)[],
	"createdAt" timestamp(3) DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "experiences" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "experiences_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"start_date" varchar(255) NOT NULL,
	"end_date" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"institute" varchar(255) NOT NULL,
	"institute_link" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL
);

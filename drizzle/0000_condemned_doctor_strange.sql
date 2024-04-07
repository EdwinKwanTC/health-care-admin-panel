CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"userId" serial NOT NULL,
	"chiName" text,
	"lastName" text,
	"firstName" text,
	"startedAt" timestamp,
	"endedAt" timestamp,
	"status" text,
	"created_at" timestamp,
	"updated_at" timestamp
);

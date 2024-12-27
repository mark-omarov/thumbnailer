CREATE SCHEMA "application";
--> statement-breakpoint
CREATE TABLE "application"."jobs" (
	"job_id" uuid PRIMARY KEY NOT NULL,
	"status" varchar(50) NOT NULL,
	"original_image_path" text,
	"thumbnail_image_path" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);

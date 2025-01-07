CREATE SCHEMA "application";
--> statement-breakpoint
CREATE TYPE "application"."status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TABLE "application"."jobs" (
	"job_id" uuid PRIMARY KEY NOT NULL,
	"status" "application"."status" NOT NULL,
	"original_image_path" text,
	"thumbnail_image_path" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);

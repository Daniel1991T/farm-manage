CREATE TABLE IF NOT EXISTS "cow" (
	"name" text NOT NULL,
	"registration_number" text PRIMARY KEY NOT NULL,
	"breed" text NOT NULL,
	"weight" text NOT NULL,
	"health_condition" text NOT NULL,
	"sex" text NOT NULL,
	"registration_number_father" text NOT NULL,
	"registration_number_mother" text NOT NULL,
	"number_of_authorization" text,
	"expiration_authorization" text,
	"entry_date" text NOT NULL,
	"color" text NOT NULL,
	"image" text NOT NULL,
	"age" text NOT NULL,
	"birth_date" text NOT NULL,
	CONSTRAINT "cow_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "new_born" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"registration_number" text,
	"breed" text NOT NULL,
	"weight" text NOT NULL,
	"health_condition" text NOT NULL,
	"sex" text NOT NULL,
	"registration_number_father" text NOT NULL,
	"registration_number_mother" text NOT NULL,
	"entry_date" text NOT NULL,
	"color" text NOT NULL,
	"image" text NOT NULL,
	"age" text NOT NULL,
	"birth_date" text NOT NULL,
	CONSTRAINT "new_born_registration_number_unique" UNIQUE("registration_number")
);

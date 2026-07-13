CREATE TABLE "purchases" (
	"id" serial PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"stripe_session_id" text,
	"paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now()
);

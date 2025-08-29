import { defineConfig } from "drizzle-kit";

// Production database configuration
if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in production environment");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
  },
  // Production optimizations
  verbose: process.env.NODE_ENV !== "production",
  strict: process.env.NODE_ENV === "production",
});

import { env } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.NEON_DATABASE_URL);

const db = drizzle(sql);

export default db;
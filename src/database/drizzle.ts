import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";
loadEnvConfig(cwd());

const sql = neon(process.env.NEON_DATABASE_URL!);

const db = drizzle(sql);

export default db;

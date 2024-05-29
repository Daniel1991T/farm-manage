import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./database/drizzle";

async function main() {
  await migrate(db, { migrationsFolder: "drizzle/migrations" });
  process.exit(0);
}

main();

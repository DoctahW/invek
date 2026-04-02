import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migration concluída");
process.exit(0);

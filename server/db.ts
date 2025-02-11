import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";


// Only use WebSocket for production (Replit) environment
if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = ws;
}

// For local development, you can use a local PostgreSQL database
// Set DATABASE_URL=postgresql://postgres:password@localhost:5432/your_db_name
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. For local development:\n" +
    "1. Install PostgreSQL locally\n" +
    "2. Create a database\n" +
    "3. Set DATABASE_URL environment variable with your database connection string\n" +
    "Example: DATABASE_URL=postgresql://postgres:password@localhost:5432/your_db_name"
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
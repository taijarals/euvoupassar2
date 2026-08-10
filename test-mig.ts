import { db } from './db/index.js';
import { migrate } from 'drizzle-orm/libsql/migrator';
migrate(db, { migrationsFolder: './drizzle' }).then(() => console.log('Migrated')).catch(console.error);

import { db } from './db/index.js';
import { sql } from 'drizzle-orm';
async function test() {
  const result = await db.run(sql`PRAGMA table_info(goals)`);
  console.log(result.rows);
}
test();

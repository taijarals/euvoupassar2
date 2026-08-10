import { db } from './db/index.js';
import { goals } from './db/schema.js';
import { inArray } from 'drizzle-orm';
async function test() {
  try {
    const selectedGoals = await db.select().from(goals).where(inArray(goals.id, [1]));
    console.log(selectedGoals);
  } catch (e) {
    console.error(e);
  }
}
test();

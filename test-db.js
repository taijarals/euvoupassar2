import { db } from './db/index.js';
import { weeks, goals, materials } from './db/schema.js';
async function run() {
  try {
    const allWeeks = await db.select().from(weeks).orderBy(weeks.number);
    console.log("Weeks:", allWeeks.length);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
run();

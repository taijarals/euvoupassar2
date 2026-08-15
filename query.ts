import { db } from './db/index.js';
import { weeks } from './db/schema.js';

async function run() {
  try {
    const allWeeks = await db.select().from(weeks);
    console.log('Weeks:', allWeeks.length);
  } catch (error) {
    console.error('Error:', error);
  }
}
run();

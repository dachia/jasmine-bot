import { connectToDb, disconnectFromDb } from '../db.mjs';
import config from '../config.mjs';

export let client
before(async () => {
  client = await connectToDb(config.MONGODB_URI_TEST);
})
after(async () => {
  await disconnectFromDb(client);
})
afterEach(async () => {
  await client.db().dropDatabase();
})
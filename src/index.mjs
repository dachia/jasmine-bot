import 'dotenv/config'
import config from './config.mjs';
import { startGrammy } from './startGrammy.mjs';
import { startExpress } from './startExpress.mjs';
import { connectToDb, disconnectFromDb } from './db.mjs';


let client
async function run() {
  client = await connectToDb(config.MONGODB_URI);
  startExpress(client);
  const grammyServer = await startGrammy(client);

  const cleanupAndExit = async () => {
    console.log('Stopping servers...');
    grammyServer?.stop();
    await disconnectFromDb(client);
    console.log('Servers stopped. Exiting...');
    process.exit(0);
  };

  process.on('SIGINT', cleanupAndExit);
  process.on('uncaughtException', async (err) => {
    console.error('Uncaught exception:', err);
    await disconnectFromDb(client);
    process.exit(1);
  });
  process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    await disconnectFromDb(client);
    process.exit(1);
  })
}

run().catch(console.error);
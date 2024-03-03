import 'dotenv/config'
import express from 'express';
import { startGrammy } from './startGrammy.mjs';
import config from './config.mjs';

startGrammy()

const app = express()
app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(config.PORT, () => {
  console.log(`App listening at http://localhost:${config.PORT}`);
});
// console.info("Express app started!")
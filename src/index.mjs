import 'dotenv/config'
import express from 'express';
import { startGrammy } from './startGrammy.mjs';

startGrammy()

const app = express()
app.get('/', (req, res) => { res.send('Hello World!') })
console.info("Express app started!")
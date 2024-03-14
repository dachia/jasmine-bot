import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import config from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function creteExpressApp() {
  return express()
}

export function registerExpressRoutes(app) {
  const staticPath = path.join(__dirname, '../../frontend/dist')
  console.log(staticPath)
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.type('html')
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
}
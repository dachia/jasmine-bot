import express from 'express';
import config from './config.mjs';

export function creteExpressApp() {
  return express()
}

export function registerExpressRoutes(app) {
  app.get('/', (req, res) => { res.send('Hello World!') })
}
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { signupController } from './http/signupController.mjs';
import { loginController } from './http/loginController.mjs';
import { userQueryController } from './http/userQueryController.mjs';
import { authMiddleware } from './http/utils/authMiddleware.mjs';
import cors from 'cors';
// import config from './config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function creteExpressApp() {
  return express()
}

export function registerExpressRoutes(app, client) {
  // app.get('/', (req, res) => {
  //   res.json({ message: 'Hello from server!' });
  // });

  const staticPath = path.join(__dirname, '../../frontend/dist')
  app.use(cors());
  app.use(express.json());
  app.use(express.static(staticPath));
  app.post('/api/sign-up', (req, res) => signupController(req, res, client))
  app.post('/api/login', (req, res) => loginController(req, res, client))
  app.get('/api/current-user', authMiddleware, (req, res) => userQueryController(req, res, client))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
  // app.use(function (error, request, response) {
  //   // Log the error to the console for debugging purposes
  //   console.error(error);

  //   // Send a response to the client
  //   console.error(response);
  //   response.status(500).send('Internal Server Error');
  // });
}

export function buildExpressApp(client) {
  const app = creteExpressApp();
  registerExpressRoutes(app, client);
  return app
}
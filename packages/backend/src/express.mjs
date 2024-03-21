import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';

import { signupController } from './http/signupController.mjs';
import { loginController } from './http/loginController.mjs';
import { userQueryController } from './http/userQueryController.mjs';
import { authMiddleware } from './http/utils/authMiddleware.mjs';
import cors from 'cors';
import config from './config.mjs';
import { authService } from './services/singletones.mjs';

// import config from './config.mjs';
const YOUR_DOMAIN = config.FRONTEND_URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stripe = Stripe(config.STRIPE_SECRET_KEY);

export function creteExpressApp() {
  return express()
}

export function registerExpressRoutes(app, client) {
  // app.get('/', (req, res) => {
  //   res.json({ message: 'Hello from server!' });
  // });

  const staticPath = path.join(__dirname, '../../frontend/dist')
  app.use(cors());

  app.post('/stripe/webhook',
    express.raw({ type: 'application/json' }),
    (request, response) => {
      let event = request.body;
      // Replace this endpoint secret with your endpoint's unique secret
      // If you are testing with the CLI, find the secret by running 'stripe listen'
      // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
      // at https://dashboard.stripe.com/webhooks
      const endpointSecret = config.STRIPE_WEBHOOK_SECRET;
      // Only verify the event if you have an endpoint secret defined.
      // Otherwise use the basic event deserialized with JSON.parse
      if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            endpointSecret
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return response.sendStatus(400);
        }
      }
      let subscription;
      let status;
      // Handle the event
      switch (event.type) {
        case 'customer.subscription.trial_will_end':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription trial ending.
          // handleSubscriptionTrialEnding(subscription);
          break;
        case 'customer.subscription.deleted':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription deleted.
          // handleSubscriptionDeleted(subscriptionDeleted);
          break;
        case 'customer.subscription.created':
          subscription = event.data.object;
          status = subscription.status;
          console.log(JSON.stringify(subscription, null, 2))
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription created.
          // handleSubscriptionCreated(subscription);
          break;
        case 'customer.subscription.updated':
          subscription = event.data.object;
          status = subscription.status;
          console.log(`Subscription status is ${status}.`);
          // Then define and call a method to handle the subscription update.
          // handleSubscriptionUpdated(subscription);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    })
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(staticPath));
  app.post('/api/sign-up', (req, res) => signupController(req, res, client))
  app.post('/api/login', (req, res) => loginController(req, res, client))
  app.get('/api/current-user', authMiddleware, (req, res) => userQueryController(req, res, client))
  app.post('/stripe/create-checkout-session', async (req, res) => {
    const token = req.body.token;
    const tokenData = await authService.verify(token);
    if (!tokenData) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { userId } = tokenData;
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,

        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    console.log(session)

    res.redirect(303, session.url);
  })
  app.post('/stripe/create-portal-session', async (req, res) => {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = YOUR_DOMAIN;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    res.redirect(303, portalSession.url);
  })
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
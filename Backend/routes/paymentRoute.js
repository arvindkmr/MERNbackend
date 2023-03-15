import express from 'express';
import {
  processPayment,
  sendStripeApiKey,
} from '../controllers/paymentController.js';

const paymentRoute = express.Router();

import { isAuthenticatedUser } from '../MiddleWare/auth.js';

paymentRoute.post('/payment/process', isAuthenticatedUser, processPayment);

paymentRoute.get('/stripeapikey', isAuthenticatedUser, sendStripeApiKey);

export default paymentRoute;

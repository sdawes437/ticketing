import Stripe from 'stripe';
import secrets from '../config';

export const stripe = new Stripe(secrets.TEST_STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

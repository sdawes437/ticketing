import * as dotenv from 'dotenv';
dotenv.config();

export default {
  TEST_STRIPE_KEY: process.env.STRIPE_KEY || '',
};

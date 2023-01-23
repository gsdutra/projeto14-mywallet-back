import express from 'express';
import signUpRouter from './signUpRouter.js';
import signInRouter from './signInRouter.js';
import transactionsRouter from './transactionsRouter.js';

const router = express.Router();

router.use([signUpRouter, signInRouter, transactionsRouter]);

export default router;
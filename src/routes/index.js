import express from 'express';
import signUpRouter from './signUpRouter.js';
import signInRouter from './signInRouter.js';

const router = express.Router();

router.use([signUpRouter, signInRouter]);

export default router;
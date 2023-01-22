import express from 'express';
import signUpRouter from './signUpRouter.js';

const router = express.Router();

router.use(signUpRouter);

export default router;
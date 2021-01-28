import express from 'express';

<<<<<<< HEAD
import { currentUser } from '@sdawesdevelopment/common';
=======
import { currentUser } from '../middlewares/current-user';
>>>>>>> dd8da330dfefdb4fb7738fde310e13b41aeb3f88

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

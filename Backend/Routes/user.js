import experss from 'express';

import {
  updateUser,
  deleteUser,
  getSingUser,
  getAllUser,
  getUserProfile,
  getMyAppointment,
} from '../Controller/userController.js';
import { authenticate, restrict } from '../auth/vetifyToken.js';
const router = experss.Router();

router.get('/:id', authenticate, restrict(['patient']), getSingUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.get('/profile/me', authenticate, restrict(['patient']), getUserProfile);
router.get(
  '/appointments/my-appointments',
  authenticate,
  restrict(['patient']),
  getMyAppointment
);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

export default router;

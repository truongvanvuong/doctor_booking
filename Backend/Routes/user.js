import experss from 'express';

import {
  updateUser,
  deleteUser,
  getSingUser,
  getAllUser,
} from '../Controller/userController.js';
import { authenticate, restrict } from '../auth/vetifyToken.js';
const router = experss.Router();

router.get('/:id', authenticate, restrict(['patient']), getSingUser);
router.get('/', authenticate, restrict(['admin']), getAllUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

export default router;

import experss from 'express';

import {
  updateDoctor,
  deleteDoctor,
  getSingDoctor,
  getAllDoctor,
} from '../Controller/doctorController.js';
import { authenticate, restrict } from '../auth/vetifyToken.js';
import reviewRouter from './review.js';

const router = experss.Router();
router.use('/:doctorId/reviews', reviewRouter);
router.get('/:id', getSingDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor);
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor);

export default router;

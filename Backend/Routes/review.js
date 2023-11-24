import experss from 'express';
import { getAllReviews, createReview } from '../Controller/reviewController.js';
import { authenticate, restrict } from '../auth/vetifyToken.js';

const router = experss.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(authenticate, restrict(['patient']), createReview);

export default router;

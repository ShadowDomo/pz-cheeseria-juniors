import * as express from 'express';
import {getCheeses, getRecentPurchases, makePurchase} from './cartController';

const router = express.Router();

// routes
router.get('/api/cheeses', getCheeses);
router.post('/api/makePurchase', makePurchase);
router.get('/api/recentPurchases', getRecentPurchases);

export default router;
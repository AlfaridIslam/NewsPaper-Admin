import express from 'express';
import { searchSections } from '../controllers/search/search.controller';
import { validateSearchQuery } from '../middleware/search.middleware';

const router = express.Router();

// Search route
router.get('/:query', validateSearchQuery, searchSections);

export default router;
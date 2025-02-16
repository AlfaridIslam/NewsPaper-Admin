import express from 'express';
import { getSection, createSection, updateSection, deleteSection, updateSection3Category } from '../controllers/news/SectionController';
import { validateSectionType, validateSectionContent } from '../middleware/sections.middleware';

const router = express.Router();

// General routes for all sections
router.get('/:type', validateSectionType, getSection);
router.post('/', validateSectionType, validateSectionContent, createSection);
router.put('/:type', validateSectionType, validateSectionContent, updateSection);
router.delete('/:type', validateSectionType, deleteSection);

// Section-specific routes
router.patch('/section3/category', validateSectionType, validateSectionContent, updateSection3Category);

export default router;
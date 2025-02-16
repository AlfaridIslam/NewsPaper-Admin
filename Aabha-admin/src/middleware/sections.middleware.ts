import { Request, Response, NextFunction } from 'express';
import { SectionContent } from '../types/index';

const validSectionTypes = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'];

export const validateSectionType = (req: Request, res: Response, next: NextFunction): void => {
    // Check both params and body for type
    const type = req.params.type || req.body.type;
    
    if (!type) {
        res.status(400).json({ message: 'Section type is required' });
        return;
    }

    if (!validSectionTypes.includes(type)) {
        res.status(400).json({ message: 'Invalid section type' });
        return;
    }

    next();
};

export const validateSectionContent = (req: Request, res: Response, next: NextFunction): void => {
    // Skip content validation for DELETE requests
    if (req.method === 'DELETE') {
        return next();
    }

    const content: SectionContent = req.body;
    if (!content || typeof content !== 'object') {
        res.status(400).json({ message: 'Invalid section content' });
        return;
    }

    next();
};
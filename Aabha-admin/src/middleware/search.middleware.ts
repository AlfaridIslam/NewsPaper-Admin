import { Request, Response, NextFunction } from 'express';

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction): void => {
    const { query } = req.params;

    if (!query || query.trim() === '') {
        res.status(400).json({ message: 'Search query is required' });
    } else {
        next();
    }
};
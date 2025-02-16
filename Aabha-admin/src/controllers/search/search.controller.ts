import { Request, Response } from 'express';
import { MainSection, SecondSection, ThirdSection, FourthSection, FifthSection, SixthSection } from '../../models/sectionModel';

export const searchSections = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.params;

    try {
        // Perform a case-insensitive search across all section models
        const mainSectionResults = await MainSection.find({
            $or: [
                { 'mainContent.content': { $regex: query, $options: 'i' } },
                { 'mainContent.image.alt': { $regex: query, $options: 'i' } },
                { 'rightColumnContent.content': { $regex: query, $options: 'i' } },
                { 'rightColumnContent.image.alt': { $regex: query, $options: 'i' } }
            ]
        });

        const secondSectionResults = await SecondSection.find({
            $or: [
                { 'leftImage.alt': { $regex: query, $options: 'i' } },
                { 'contentBlocks.content': { $regex: query, $options: 'i' } },
                { 'contentBlocks.image.alt': { $regex: query, $options: 'i' } }
            ]
        });

        const thirdSectionResults = await ThirdSection.find({
            $or: [
                { 'categories.stories.content': { $regex: query, $options: 'i' } },
                { 'categories.stories.image.alt': { $regex: query, $options: 'i' } },
                { 'categories.poetry.content': { $regex: query, $options: 'i' } },
                { 'categories.poetry.image.alt': { $regex: query, $options: 'i' } },
                { 'categories.childrensCorner.content': { $regex: query, $options: 'i' } },
                { 'categories.childrensCorner.image.alt': { $regex: query, $options: 'i' } }
            ]
        });

        const fourthSectionResults = await FourthSection.find({
            $or: [
                { 'authors.name': { $regex: query, $options: 'i' } },
                { 'authors.description': { $regex: query, $options: 'i' } },
                { 'authors.image.alt': { $regex: query, $options: 'i' } }
            ]
        });

        const fifthSectionResults = await FifthSection.find({
            $or: [
                { 'cards.heading': { $regex: query, $options: 'i' } },
                { 'cards.content': { $regex: query, $options: 'i' } },
                { 'cards.image.alt': { $regex: query, $options: 'i' } }
            ]
        });

        const sixthSectionResults = await SixthSection.find({
            $or: [
                { 'leftSide.top.content': { $regex: query, $options: 'i' } },
                { 'leftSide.top.image.alt': { $regex: query, $options: 'i' } },
                { 'leftSide.bottom.content': { $regex: query, $options: 'i' } },
                { 'leftSide.bottom.image.alt': { $regex: query, $options: 'i' } },
                { 'rightSide.alt': { $regex: query, $options: 'i' } }
            ]
        });

        // Combine all results into a single array
        const results = [
            ...mainSectionResults,
            ...secondSectionResults,
            ...thirdSectionResults,
            ...fourthSectionResults,
            ...fifthSectionResults,
            ...sixthSectionResults
        ];

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No results found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error searching sections', error });
    }
};
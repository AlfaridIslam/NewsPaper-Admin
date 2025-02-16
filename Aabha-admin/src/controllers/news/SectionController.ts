import { Request, Response } from 'express';
import { MainSection, SecondSection, ThirdSection, FourthSection, FifthSection, SixthSection } from '../../models/sectionModel';
import { SectionContent } from '../../types/index';

const getModelByType = (type: string) => {
    const modelMap: { [key: string]: any } = {
        'section1': MainSection,
        'section2': SecondSection,
        'section3': ThirdSection,
        'section4': FourthSection,
        'section5': FifthSection,
        'section6': SixthSection
    };

    const model = modelMap[type];
    if (!model) {
        throw new Error('Invalid section type');
    }

    return model;
};

export const getSection = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.params;
    try {
        const SectionModel = getModelByType(type) as typeof MainSection;
        const section = await SectionModel.findOne({ type });
        if (!section) {
            res.status(404).json({ message: 'Section not found' });
        } else {
            res.status(200).json(section);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving section', error });
    }
};

export const createSection = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.body;
    const content: SectionContent = req.body;
    try {
        const SectionModel = getModelByType(type) as typeof MainSection;
        const newSection = new SectionModel({ ...content, type, updatedAt: new Date() });
        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(500).json({ message: 'Error creating section', error });
    }
};

export const updateSection = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.params;
    const content: SectionContent = req.body;
    try {
        const SectionModel = getModelByType(type) as typeof MainSection;
        const updatedSection = await SectionModel.findOneAndUpdate(
            { type },
            { ...content, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedSection) {
            res.status(404).json({ message: 'Section not found' });
        } else {
            res.status(200).json(updatedSection);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating section', error });
    }
};

export const deleteSection = async (req: Request, res: Response): Promise<void> => {
    const { type } = req.params;
    const { id } = req.query;

    try {
        const SectionModel = getModelByType(type);

        // If an ID is provided, use it for deletion
        if (id) {
            const deletedSection = await SectionModel.findByIdAndDelete(id);
            if (!deletedSection) {
                res.status(404).json({ message: 'Section not found' });
                return;
            }
            res.status(200).json({ message: 'Section deleted successfully' });
            return;
        }

        // If no ID is provided, find and delete by type
        const existingSection = await SectionModel.findOne({ type });
        
        if (!existingSection) {
            res.status(404).json({ message: 'Section not found' });
            return;
        }

        await SectionModel.findByIdAndDelete(existingSection._id);
        res.status(200).json({ message: 'Section deleted successfully' });

    } catch (error) {
        console.error('Delete error:', error);
        if (error instanceof Error && error.message === 'Invalid section type') {
            res.status(400).json({ message: 'Invalid section type' });
        } else {
            res.status(500).json({ 
                message: 'Error deleting section',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
};

export const updateSection3Category = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.body;
    try {
        const updatedSection = await ThirdSection.findOneAndUpdate(
            { type: 'section3' },
            { 'categories.category': category, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedSection) {
            res.status(404).json({ message: 'Section 3 not found' });
        } else {
            res.status(200).json(updatedSection);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Section 3 category', error });
    }
};
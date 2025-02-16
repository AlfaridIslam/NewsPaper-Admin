import mongoose, { Schema, Document } from 'mongoose';
import { SectionContent } from '../types/index';

// Common Types
interface BaseImage {
    url: string;
    alt?: string;
}

interface BaseContent {
    title?: string;
    content: string;
    image?: BaseImage;
}

// Section 1: Main Section
interface IMainSection extends Document {
    type: 'section1';
    mainContent: {
        image: BaseImage;
        content: string;
    };
    rightColumnContent: BaseContent[];
    updatedAt: Date;
}

// Section 2: Image with 4 Contents
interface ISecondSection extends Document {
    type: 'section2';
    leftImage: BaseImage;
    contentBlocks: BaseContent[];
    updatedAt: Date;
}

// Section 3: Three Column Categories
interface ICategoryEntry {
    image: BaseImage;
    content: string;
}

interface IThirdSection extends Document {
    type: 'section3';
    categories: {
        stories: ICategoryEntry[];
        poetry: ICategoryEntry[];
        childrensCorner: ICategoryEntry[];
    };
    updatedAt: Date;
}

// Section 4: Popular Authors
interface IAuthor {
    image: BaseImage;
    name: string;
    description: string;
}

interface IFourthSection extends Document {
    type: 'section4';
    title: string;
    authors: IAuthor[];
    updatedAt: Date;
}

// Section 5: Five Cards
interface ICard {
    image: BaseImage;
    heading: string;
    content: string;
}

interface IFifthSection extends Document {
    type: 'section5';
    cards: ICard[];
    updatedAt: Date;
}

// Section 6: Two Division Layout
interface ISixthSection extends Document {
    type: 'section6';
    leftSide: {
        top: BaseContent;
        bottom: BaseContent;
    };
    rightSide: BaseImage[];
    updatedAt: Date;
}

// Schemas
const BaseImageSchema = new Schema({
    url: { type: String, required: true },
    alt: String
});

const BaseContentSchema = new Schema({
    title: String,
    content: { type: String, required: true },
    image: BaseImageSchema
});

// Section 1 Schema
const MainSectionSchema = new Schema({
    type: { type: String, default: 'section1' },
    mainContent: {
        image: { type: BaseImageSchema, required: true },
        content: { type: String, required: true }
    },
    rightColumnContent: {
        type: [BaseContentSchema],
        validate: [
            (arr: any[]) => arr.length <= 3,
            'Right column cannot have more than 3 content blocks'
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Section 2 Schema
const SecondSectionSchema = new Schema({
    type: { type: String, default: 'section2' },
    leftImage: { type: BaseImageSchema, required: true },
    contentBlocks: {
        type: [BaseContentSchema],
        validate: [
            (arr: any[]) => arr.length <= 4,
            'Cannot have more than 4 content blocks'
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Section 3 Schema
const CategoryEntrySchema = new Schema({
    image: { type: BaseImageSchema, required: true },
    content: { type: String, required: true }
});

const ThirdSectionSchema = new Schema({
    type: { type: String, default: 'section3' },
    categories: {
        stories: [CategoryEntrySchema],
        poetry: [CategoryEntrySchema],
        childrensCorner: [CategoryEntrySchema]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Section 4 Schema
const AuthorSchema = new Schema({
    image: { type: BaseImageSchema, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const FourthSectionSchema = new Schema({
    type: { type: String, default: 'section4' },
    title: { type: String, default: 'Popular Authors' },
    authors: {
        type: [AuthorSchema],
        validate: [
            (arr: any[]) => arr.length <= 5,
            'Cannot have more than 5 authors'
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Section 5 Schema
const CardSchema = new Schema({
    image: { type: BaseImageSchema, required: true },
    heading: { type: String, required: true },
    content: { type: String, required: true }
});

const FifthSectionSchema = new Schema({
    type: { type: String, default: 'section5' },
    cards: {
        type: [CardSchema],
        validate: [
            (arr: any[]) => arr.length <= 5,
            'Cannot have more than 5 cards'
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Section 6 Schema
const SixthSectionSchema = new Schema({
    type: { type: String, default: 'section6' },
    leftSide: {
        top: { type: BaseContentSchema, required: true },
        bottom: { type: BaseContentSchema, required: true }
    },
    rightSide: {
        type: [BaseImageSchema],
        validate: [
            (arr: any[]) => arr.length <= 3,
            'Cannot have more than 3 images'
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

// Create models
export const MainSection = mongoose.model<IMainSection>('MainSection', MainSectionSchema);
export const SecondSection = mongoose.model<ISecondSection>('SecondSection', SecondSectionSchema);
export const ThirdSection = mongoose.model<IThirdSection>('ThirdSection', ThirdSectionSchema);
export const FourthSection = mongoose.model<IFourthSection>('FourthSection', FourthSectionSchema);
export const FifthSection = mongoose.model<IFifthSection>('FifthSection', FifthSectionSchema);
export const SixthSection = mongoose.model<ISixthSection>('SixthSection', SixthSectionSchema);
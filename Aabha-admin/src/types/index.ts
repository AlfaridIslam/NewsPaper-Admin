export interface BaseContent {
  id: string;
  title?: string;
  description: string;
  imageUrl?: string;
  updatedAt: Date;
}

export interface Section1Content extends BaseContent {
  type: 'section1';
  mainImage: string;
  rightColumnContents: {
    image: string;
    content: string;
  }[];
}

export interface Section2Content extends BaseContent {
  type: 'section2';
  mainImage: string;
  contentBlocks: {
    title: string;
    content: string;
  }[];
}

export interface Section3Content extends BaseContent {
  type: 'section3';
  category: 'Stories' | 'Poetry' | 'ChildrensCorner';
  entries: {
    image: string;
    content: string;
  }[];
}

export interface Section4Content extends BaseContent {
  type: 'section4';
  authors: {
    image: string;
    name: string;
    bio: string;
  }[];
}

export interface Section5Content extends BaseContent {
  type: 'section5';
  cards: {
    image: string;
    heading: string;
    content: string;
  }[];
}

export interface Section6Content extends BaseContent {
  type: 'section6';
  leftSide: {
    topContent: { image: string; content: string; };
    bottomContent: { image: string; content: string; };
  };
  rightSide: {
    images: string[];
  };
}

export type SectionContent = 
  | Section1Content 
  | Section2Content 
  | Section3Content 
  | Section4Content 
  | Section5Content 
  | Section6Content;
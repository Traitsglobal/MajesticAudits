import { Metadata as NextMetadata } from "next"

// Image types
interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: ImageFormat;
        small: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Content types
interface TextContent {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    children: TextContent[];
    type: "text";
    text: string;
}

interface ParagraphContent {
    type: "paragraph";
    children: TextContent[];
}

interface ListItemContent {
    type: "list-item";
    children: TextContent[];
}

interface ListContent {
    type: "list";
    format: "unordered";
    children: ListItemContent[];
}

// Block types
export interface OurStoryBlock {
    __component: "layout.ourstory";
    id: number;
    content: ParagraphContent[];
    title: string;
    subtitle: string;
    Image: Image;
}

interface VisionMissionContent {
    id: number;
    title: string;
    content: (ParagraphContent | ListContent)[];
}

export interface VisionMissionBlock {
    __component: "layout.vision-and-mission";
    id: number;
    title: string;
    subtitle: string;
    vision: VisionMissionContent;
    mission: VisionMissionContent;
}

interface CoreValueCard {
    id: number;
    mainhead: string;
    description: string;
    icon: Image;
}

export interface CoreValuesBlock {
    __component: "layout.corevalues";
    id: number;
    mainhead: string;
    subhead: string;
    description: string;
    cards: CoreValueCard[];
}

export type AboutContentBlock = 
    | OurStoryBlock 
    | VisionMissionBlock 
    | CoreValuesBlock;

// Metadata types
export interface AboutMetadataResponse {
    id: number;
    metaTitle: string;
    metaDescription: string;
    MetaKeywords: string;
    MetaAuthor: string;
}

// Type for creating Next.js metadata
export interface AboutMetadata extends NextMetadata {
    title: string;
    description: string;
    keywords: string;
    authors: Array<{ name: string }>;
    openGraph: {
        title: string;
        description: string;
    };
}

// Fallback metadata constant
export const fallbackMetadata: AboutMetadata = {
    title: "About Us | Majestic Audits",
    description: "Learn about Majestic Audits",
    keywords: "Majestic Audits, Audit & Tax Consultancy, Dubai, UAE",
    authors: [{ name: "Majestic Audits" }],
    openGraph: {
        title: "About Us | Majestic - CFO Services",
        description: "Learn about Majestic Accounting and Bookkeeping Services",
    },
} as const;

// Main data structure
export interface AboutPageData {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        blocks: AboutContentBlock[];
        metadata: AboutMetadataResponse;
    };
    meta: Record<string, string>;
}

// Props types
export interface AboutPageClientProps {
    data: AboutPageData['data'];
}

// Helper function type
export type CreateMetadataFn = (metadata: AboutMetadataResponse) => AboutMetadata;

// Helper function
export const createMetadata: CreateMetadataFn = (metadata) => ({
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    keywords: metadata.MetaKeywords,
    authors: [{ name: metadata.MetaAuthor }],
    openGraph: {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    },
}); 
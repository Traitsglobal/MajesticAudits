// Image format types
interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null | string;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

// Image formats object type
interface ImageFormats {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
}

// Image type
interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: null | string;
    caption: null | string;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Content child type
interface ContentChild {
    type: string;
    text?: string;
    bold?: boolean;
    url?: string;
    children?: ContentChild[];
    italic?: boolean;
    underline?: boolean;
}

// Content block type
export interface ContentBlock {
    type: string;
    level?: number;
    format?: string;
    children: ContentChild[];
}

// Blog post type
export interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    date: string;
    content: ContentBlock[];
    author: string;
    designation: string;
    tags: string;
    categories: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    profilepicture: Image;
    Image: Image;
}

// Meta pagination type
interface MetaPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// Blog response type
export interface BlogResponse {
    data: BlogPost[];
    meta: {
        pagination: MetaPagination;
    };
} 
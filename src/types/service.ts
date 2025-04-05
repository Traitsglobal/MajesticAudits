export interface ServiceContent {
    type: string;
    format?: string;
    level?: number;
    children: ContentChild[];
}

interface ContentChild {
    type: string;
    text?: string;
    bold?: boolean;
    url?: string;
    children?: ContentChild[];
    italic?: boolean;
    underline?: boolean;
}

export interface Service {
    id: number;
    documentId: string;
    title: string;
    content: ServiceContent[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    slug: string;
}

export interface ServiceResponse {
    data: Service[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
} 
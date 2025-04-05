import { PageMetadata } from "./metadata"

export interface ContactIcon {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ContactDetail {
    id: number;
    type: string;
    values: string;
    icon: ContactIcon;
}

export interface ContactPageData {
    data: {
        id: number;
        documentId: string;
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        metadata: PageMetadata;
        contactdetails: ContactDetail[];
    };
    meta: Record<string, unknown>;
} 
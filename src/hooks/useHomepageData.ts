'use client';

import { useState, useEffect } from 'react';
import ApiService from '@/services/api.services';
import { Blocks } from '@/types/block';

interface Metadata {
    metaTitle: string;
    metaDescription: string;
    MetaKeywords: string;
    MetaAuthor: string;
}

interface HomepageData {
    blocks: Blocks[];
    metadata: Metadata;
    isLoading: boolean;
    error: Error | null;
}

const LOGO_STORAGE_KEY = 'header_logo';

export const useHomepageData = () => {
    const [data, setData] = useState<HomepageData>({
        blocks: [],
        metadata: {
            metaTitle: '',
            metaDescription: '',
            MetaKeywords: '',
            MetaAuthor: '',
        },
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.fetchHomepageData();
                const newData = {
                    blocks: response.data.blocks || [],
                    metadata: response.data.metadata || {
                        metaTitle: '',
                        metaDescription: '',
                        MetaKeywords: '',
                        MetaAuthor: '',
                    },
                    isLoading: false,
                    error: null,
                };

                setData(newData);
            } catch (error) {
                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error as Error,
                }));
            }
        };

        fetchData();
    }, []);

    const getHeaderLogo = () => {
        if (typeof window !== 'undefined') {
            const storedLogo = sessionStorage.getItem(LOGO_STORAGE_KEY);
            if (storedLogo) {
                return JSON.parse(storedLogo);
            }
        }

        const headerBlock = data.blocks.find((block: Blocks) => block.__component === 'layout.header');
        const logo = headerBlock?.logo || null;

        if (logo && typeof window !== 'undefined') {
            sessionStorage.setItem(LOGO_STORAGE_KEY, JSON.stringify(logo));
        }

        return logo;
    };

    return { ...data, getHeaderLogo };
}; 
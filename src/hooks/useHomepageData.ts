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
                setData({
                    blocks: response.data.blocks || [],
                    metadata: response.data.metadata || {
                        metaTitle: '',
                        metaDescription: '',
                        MetaKeywords: '',
                        MetaAuthor: '',
                    },
                    isLoading: false,
                    error: null,
                });
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
        const headerBlock = data.blocks.find(
            (block: Blocks) => block.__component === 'layout.header'
        );
        return headerBlock?.logo || null;
    };

    return {
        ...data,
        getHeaderLogo,
    };
}; 
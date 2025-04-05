import React from 'react';
import { Blocks, HeaderBlock, HeroBlock, TopbarBlock } from '@/types/block';

export function blockRenderer(block: Blocks) {
    const loadComponent = async (componentName: string) => {
        switch (componentName) {
            case "layout.topbar": {
                const { default: Topbar } = await import('@/components/layout/top-bar');
                return React.createElement(Topbar, block as unknown as TopbarBlock);
            }
            case "layout.header": {
                const { default: Header } = await import('@/components/layout/main-navigation');
                return React.createElement(Header, block as unknown as HeaderBlock);
            }
            case "layout.hero": {
                const { default: HeroSlider } = await import('@/components/home/hero-section');
                return React.createElement(HeroSlider, block as HeroBlock);
            }
            default:
                return null;
        }
    };

    const Component = loadComponent(block.__component);
    return Component;
}

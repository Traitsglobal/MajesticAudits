import type { Metadata } from "next"

// Default metadata configuration for the entire site
export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://majesticaudits.ae'),
  title: {
    template: '%s | Majestic Audits',
    default: 'Majestic Audits | Leading Audit & Tax Consultancy in Dubai, UAE',
  },
  description: "Professional financial services including CFO services, corporate tax, VAT, and accounting solutions in Dubai, UAE.",
  keywords: "Majestic Audits, CFO Services Dubai, Tax Consultancy UAE, Corporate Tax Dubai, VAT Services UAE",
  authors: [{ name: "Majestic Audits" }],
  applicationName: "Majestic Audits",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Majestic Audits',
    title: 'Majestic Audits | Leading Audit & Tax Consultancy in Dubai, UAE',
    description: 'Professional financial services including CFO services, corporate tax, VAT, and accounting solutions in Dubai, UAE.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majestic Audits',
    description: 'Expert financial services and tax consultancy in Dubai, UAE',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: 'Majestic Audits | Leading Audit & Tax Consultancy in Dubai, UAE',
    description: 'Expert financial services including CFO services, corporate tax, and accounting solutions in Dubai.',
  },
  about: {
    title: 'About Us | Majestic Audits',
    description: 'Learn about our professional team and our commitment to excellence in financial services.',
  },
  services: {
    title: 'Our Services | Majestic Audits',
    description: 'Explore our comprehensive range of financial services and solutions.',
  },
  blog: {
    title: 'Blog | Majestic Audits',
    description: 'Stay updated with the latest news, insights, and trends in financial services, taxation, and business management.',
  },
  contact: {
    title: 'Contact Us | Majestic Audits',
    description: 'Get in touch with our team of financial experts for professional assistance.',
  },
}

interface MetadataProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
}

export function generatePageMetadata(page: string, props?: MetadataProps): Metadata {
  const pageConfig = pageMetadata[page as keyof typeof pageMetadata] || {}
  
  return {
    ...defaultSiteMetadata,
    title: {
      template: '%s',
      default: props?.title || pageConfig.title || (defaultSiteMetadata.title && typeof defaultSiteMetadata.title === 'object' && 'default' in defaultSiteMetadata.title ? defaultSiteMetadata.title.default : 'Majestic Audits'),
    },
    description: props?.description || pageConfig.description || defaultSiteMetadata.description,
    keywords: props?.keywords || defaultSiteMetadata.keywords,
    authors: props?.author ? [{ name: props.author }] : defaultSiteMetadata.authors,
    openGraph: {
      ...defaultSiteMetadata.openGraph,
      title: props?.title || pageConfig.title || defaultSiteMetadata.openGraph?.title,
      description: props?.description || pageConfig.description || defaultSiteMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultSiteMetadata.twitter,
      title: props?.title || pageConfig.title || defaultSiteMetadata.twitter?.title,
      description: props?.description || pageConfig.description || defaultSiteMetadata.twitter?.description,
    },
  }
} 
export interface PageMetadata {
  metaTitle: string
  metaDescription: string
  MetaKeywords: string
  MetaAuthor: string
}

export interface MetadataConfig {
  title: string
  description: string
  keywords?: string
  openGraph?: {
    title: string
    description: string
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
}

export type PageKey = 'home' | 'about' | 'services' | 'blog' | 'contact' 
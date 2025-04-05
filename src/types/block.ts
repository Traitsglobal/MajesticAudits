export interface TopbarBlock {
  __component: "layout.topbar"
  id: number
  openinghours: string
  DigitalPlatforms: DigitalPlatform[]
}

export interface DigitalPlatform {
  id: number
  name: string
  Link: string
  isExternal: boolean
  icon: Image
}

export interface Image {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string
  width: number
  height: number
  formats: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface HeaderBlock {
  __component: "layout.header"
  id: number
  name: string
  logo: Image
}

export interface HeroBlock {
  __component: "layout.hero"
  id: number
  Carosel: Carosel[]
}

export interface Carosel {
  id: number
  subhead: string
  mainhead: string
  description: string
  sliderImage: Image
  bgImage: Image
}

export type Blocks = TopbarBlock | HeaderBlock | HeroBlock;

export interface HomePage {
  data: {
    id: number
    documentId: string
    title: string
    description: string
    blocks: Blocks[]
  }
  meta: Meta
}

export interface Meta {
  name: string
  description: string
  keywords: string
}








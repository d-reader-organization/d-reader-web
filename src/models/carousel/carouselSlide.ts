import { CarouselLocation } from '@/enums/carouselLocation'

export enum CarouselTagType {
  Chip = 'Chip',
  Button = 'Button',
}

export type CarouselTag = {
  title: string
  type: CarouselTagType
  href?: string
  timestamp?: string
}

export type CarouselSlide = {
  id: number
  image: string
  priority: number
  title?: string
  subtitle?: string
  isPublished: boolean
  isExpired: boolean
  location: CarouselLocation
  comicIssueId?: number
  comicSlug?: string
  creatorId?: string
  externalLink?: string
  tags?: CarouselTag[]
}

export type CreateCarouselSlideData = Pick<
  CarouselSlide,
  'image' | 'priority' | 'title' | 'subtitle' | 'location' | 'comicIssueId' | 'comicSlug' | 'creatorId' | 'externalLink'
>

export type UpdateCarouselSlideData = Partial<
  Pick<
    CreateCarouselSlideData,
    'priority' | 'title' | 'subtitle' | 'location' | 'comicIssueId' | 'comicSlug' | 'creatorId' | 'externalLink'
  >
>

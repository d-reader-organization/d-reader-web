export type ComicCardType = 'large' | 'default'

export type SlugParamsProps = {
  params: Promise<{
    slug: string
  }>
}

export type FileUploadRef = {
  reset: () => void
}

export type DailyDropCardType = {
  id: number
  title: string
  image: string
}

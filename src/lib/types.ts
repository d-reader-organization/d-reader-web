export type ComicCardType = 'large' | 'default'

export type SlugParamsProps = {
  params: Promise<{ slug: string }>
}

export type FileUploadRef = {
  reset: () => void
}

export type SvgIconProps = { className?: React.SVGProps<SVGSVGElement>['className'] }
export type VariantSvgIconProps = { solid?: boolean } & SvgIconProps

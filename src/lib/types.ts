export type ComicCardType = 'large' | 'default'

export type SlugParamsProps = {
  params: Promise<{
    slug: string
  }>
}

export type FileUploadRef = {
  reset: () => void
}

export type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  solid?: boolean
}

// TODO: does it make sense to kill this type?
// Also, should we lowercase the Icon property on SVG components?
export type VariantSvgIconProps = {
  solid?: boolean
} & SvgIconProps

export const FallbackMetadataImage: React.FC = () => (
  <img
    src={process.env.NEXT_PUBLIC_SITE_URL + '/assets/images/metadata-home.jpg'}
    alt=''
    style={{ width: '100%', height: '100%' }}
  />
)

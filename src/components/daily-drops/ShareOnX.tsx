'use client'

import Link from 'next/link'

export const ShareOnX: React.FC = () => {
  const twitterIntentComicMinted = ''
  return (
    <Link
      href={twitterIntentComicMinted ?? ''}
      target='_blank'
      className='min-w-20 h-9 px-4 py-1 absolute left-4 top-4 rounded-lg border border-grey-300'
    >
      Share on &#120143;
    </Link>
  )
}

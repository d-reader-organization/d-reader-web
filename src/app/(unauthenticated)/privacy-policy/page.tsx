import { PrivacyPolicyContent } from '@/components/privacy-policy/markdown-content'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'dReader - Privacy Policy',
  description: '🔏 dReader Privacy Policy and Terms of Service',
}

export default function PrivacyPolicy() {
  return (
    <div className='container mx-auto py-8 max-w-screen-md'>
      <PrivacyPolicyContent />
    </div>
  )
}

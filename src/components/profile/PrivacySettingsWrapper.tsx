import { PrivacySettings } from './PrivacySettings'
import { fetchUserConsents } from '@/app/lib/api/user/queries'
import { ConsentType } from '@/models/user'

export const PrivacySettingsWrapper: React.FC = async () => {
  const userConsents = await fetchUserConsents()

  const initialMarketingConsentGiven =
    userConsents.find((consent) => consent.consentType === ConsentType.Marketing)?.isConsentGiven ?? false
  const initialDataAnalyticsConsentGiven =
    userConsents.find((consent) => consent.consentType === ConsentType.DataAnalytics)?.isConsentGiven ?? false

  return (
    <PrivacySettings
      initialDataAnalyticsConsentGiven={initialDataAnalyticsConsentGiven}
      initialMarketingConsentGiven={initialMarketingConsentGiven}
    />
  )
}

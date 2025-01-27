import { PrivacySettings } from './PrivacySettings'
import { fetchUserConsents } from '@/app/lib/api/user/queries'
import { ConsentType, UserConsent } from '@/models/user'

const findConsentState = (userConsents: UserConsent[], consentType: ConsentType) => {
  const consent = userConsents.find((consent) => consent.consentType === consentType)
  const consentState = consent?.isConsentGiven ?? false
  return consentState
}

export const PrivacySettingsWrapper: React.FC = async () => {
  const userConsents = await fetchUserConsents()

  const initialMarketingConsentGiven = findConsentState(userConsents, ConsentType.Marketing)
  const initialDataAnalyticsConsentGiven = findConsentState(userConsents, ConsentType.DataAnalytics)

  return (
    <PrivacySettings
      initialDataAnalyticsConsentGiven={initialDataAnalyticsConsentGiven}
      initialMarketingConsentGiven={initialMarketingConsentGiven}
    />
  )
}

import { dataAnalyticsConsentSwitch, marketingConsentSwitch } from '@/constants/keys'
import { createUserConsent } from '../../api/user/mutations'
import { ConsentType } from '@/models/user'

type ReturnType = {
  errorMessage?: string
  message?: string
  status: 'INFO' | 'ERROR' | 'SUCCESS'
}

export const createConsentsAction = async (
  initialValue: { isMarketingConsentGiven: boolean; isDataAnalyticsConsentGiven: boolean } | null,
  _: ReturnType | null,
  formData: FormData
): Promise<ReturnType | null> => {
  const isMarketingConsentGiven = formData.get(marketingConsentSwitch) === 'on'
  const isDataAnalyticsConsentGiven = formData.get(dataAnalyticsConsentSwitch) === 'on'

  if (
    initialValue?.isDataAnalyticsConsentGiven === isDataAnalyticsConsentGiven &&
    initialValue.isMarketingConsentGiven === isMarketingConsentGiven
  ) {
    return {
      message: 'Nothing to update',
      status: 'INFO',
    }
  }

  let errorMessage = ''
  if (initialValue?.isDataAnalyticsConsentGiven !== isDataAnalyticsConsentGiven) {
    errorMessage = await createUserConsent({
      consentType: ConsentType.DataAnalytics,
      isConsentGiven: isDataAnalyticsConsentGiven,
    })
  }
  if (initialValue?.isMarketingConsentGiven !== isMarketingConsentGiven) {
    errorMessage = await createUserConsent({
      consentType: ConsentType.Marketing,
      isConsentGiven: isMarketingConsentGiven,
    })
  }

  if (!errorMessage) {
    return { message: 'Consents updated successfully', status: 'SUCCESS' }
  }

  return { errorMessage, status: 'ERROR' }
}

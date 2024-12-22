import { fetchMe } from '@/app/lib/api/user/queries'
import SphereRampWidget from '@/components/ramp/SphereRampWidget'

async function SphereRampPage() {
  const me = await fetchMe()
  if (!me?.id) {
    return null
  }

  return <SphereRampWidget />
}

export default SphereRampPage

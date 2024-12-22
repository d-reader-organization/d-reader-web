'use client'

import { useEffect } from 'react'

const SphereRampWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.crossOrigin = 'anonymous'
    script.src = 'https://spherepay.co/packages/sphere-ramp/index.js'
    script.onload = () => {
      ///@ts-expect-error: SphereRamp is not recognized as a valid constructor
      new SphereRamp({
        containerId: 'container',
        applicationId: process.env.SPHERE_APPLICATION_ID,
        theme: {
          components: {
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo192.png`,
          },
        },
      })
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div id='container'></div>
}

export default SphereRampWidget

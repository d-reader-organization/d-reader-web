'use client'

import { ButtonLink, ButtonLinkProps } from '@/components/ui/ButtonLink'
import React from 'react'

type Props = {
  href: string
} & ButtonLinkProps

export const SignInOrRegisterLinkButton: React.FC<Props> = ({ href, ...props }) => (
  <ButtonLink className='w-full' variant='white' subVariant={1} size='lg' href={href} {...props}>
    Sign In / Register
  </ButtonLink>
)

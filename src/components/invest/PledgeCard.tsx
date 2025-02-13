'use client'

import { Card, CardContent, CardTitle } from '../ui/card'
import { Input } from '../ui'
import { ConfirmInterestButton } from './ConfirmInterestButton'
import { useState } from 'react'

export function PledgeCard({
  slug,
  defaultPrice,
  toggleExpressedInterestDialog,
}: {
  slug: string
  defaultPrice: number
  toggleExpressedInterestDialog: VoidFunction
}) {
  const [price, setPrice] = useState<number>(defaultPrice)

  return (
    <Card className='text-white'>
      <CardContent className='p-6'>
        <CardTitle className='text-xl mb-2'>Pledge a higher amount</CardTitle>
        <p className='mb-4'>
          Pledge the amount higher than the biggest reward, just because the project speaks to you.
        </p>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            placeholder={defaultPrice.toString()}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className='w-24'
          />
          <ConfirmInterestButton
            slug={slug}
            className='min-w-[146px]'
            amount={price}
            toggleExpressedInterestDialog={toggleExpressedInterestDialog}
          />
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import { useState } from 'react'
import { Button, Input, toast } from '../ui'
import { useToggle } from '@/hooks'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchExpressInterestTransaction } from '@/app/lib/api/transaction/queries'
import { versionedTransactionFromBs64 } from '@/utils/transactions'
import { expressInterest } from '@/app/lib/api/invest/mutations'
import { ConnectButton } from '../shared/buttons/ConnectButton'
import { useRouter } from 'next/navigation'
import { RoutePath } from '@/enums/routePath'
import { Loader } from '../shared/Loader'

interface Option {
  label: string
  value: number
}

const EXPRESS_INTEREST_OPTIONS: Option[] = [
  { label: '$20', value: 20 },
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: '$2,500', value: 2500 },
  { label: 'Other', value: 0 },
]

type Props = {
  slug: string
}

export const ExpressInterestSection: React.FC<Props> = ({ slug }) => {
  const [selectedOption, setOption] = useState<Option | undefined>()
  const { publicKey, signTransaction } = useWallet()
  const [isLoading, toggleLoading] = useToggle()
  const [other, setOther] = useState<number | undefined>()
  // "other" option should open a text input
  // we need to pull in the data from the project
  const { push, refresh } = useRouter()

  const onSubmit = async () => {
    // send API request with the selected amount
    console.log(selectedOption)
    if (!selectedOption) {
      toast({ description: 'Please select an amount', variant: 'error' })
      return
    }

    if (!publicKey || !signTransaction) {
      toast({ description: 'Please connect your wallet', variant: 'error' })
      return
    }
    try {
      toggleLoading()
      const { data: encodedTransaction, errorMessage } = await fetchExpressInterestTransaction({
        walletAddress: publicKey.toString(),
        projectSlug: slug,
      })
      if (!encodedTransaction || errorMessage) {
        throw new Error(errorMessage || 'Failed to fetch transaction')
      }
      const transaction = versionedTransactionFromBs64(encodedTransaction)
      const signedTransaction = await signTransaction(transaction)
      const serializedTransaction = Buffer.from(signedTransaction.serialize()).toString('base64')
      const expressedAmount = selectedOption.label === 'Other' ? other : selectedOption.value
      await expressInterest({
        slug,
        request: { transaction: serializedTransaction, expressedAmount: expressedAmount || 0 },
      })
      toast({
        description: 'Successfully expressed interest!',
        variant: 'success',
      })
    } catch (error) {
      console.error('Express interest error:', error)
      toast({
        description: error instanceof Error ? error.message : 'Failed to express interest. Please try again.',
        variant: 'error',
      })
    } finally {
      // throw confetti after submitting
      // redirectTo after a couple of seconds
      toggleLoading()
      refresh()
      push(RoutePath.InvestDetails(slug))
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {EXPRESS_INTEREST_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant='outline'
            className={`h-12 text-xl border-green-genesis hover:bg-green-genesis hover:text-black ${selectedOption?.label == option.label ? 'bg-green-genesis text-black' : ''}`}
            onClick={() => {
              if (option.label == selectedOption?.label) setOption(undefined)
              else setOption(option)
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <Input
        type='number'
        onChange={(e) => setOther(+e.target.value)}
        defaultValue={0}
        min={0}
        className={`max-w-full border-green-genesis ${selectedOption?.label === 'Other' ? '' : 'hidden'}`}
      />
      {publicKey ? (
        <Button className='w-full h-12 bg-green-genesis text-black' onClick={onSubmit}>
          {isLoading ? <Loader /> : 'Express Interest'}
        </Button>
      ) : (
        <ConnectButton className='w-full h-12 bg-green-genesis text-black' text='Connect Wallet' />
      )}
    </div>
  )
}
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
import { LoaderIcon } from '../icons/theme/LoaderIcon'
import { ExpressedInterestDialog } from '../shared/dialogs/ExpressedInterestDialog'
import { useAuthStore } from '@/providers/AuthStoreProvider'

interface Option {
  label: string
  value: number
}

const DEFAULT_OPTION: Option = { label: '$50', value: 50 }
const EXPRESS_INTEREST_OPTIONS: Option[] = [
  { label: '$20', value: 20 },
  DEFAULT_OPTION,
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1,000', value: 1000 },
  { label: 'Other', value: 0 },
]

type Props = {
  slug: string
}

export const ExpressInterestSection: React.FC<Props> = ({ slug }) => {
  const [selectedOption, setOption] = useState<Option | undefined>(DEFAULT_OPTION)
  const { publicKey, signTransaction } = useWallet()
  const [isLoading, toggleLoading] = useToggle()
  const [other, setOther] = useState<number | undefined>(1)
  const [showExpressedInterestDialog, toggleExpressedInterestDialog] = useToggle()
  // "other" option should open a text input
  // we need to pull in the data from the project
  const { push, refresh } = useRouter()
  const accessToken = useAuthStore((state) => state.accessToken)
  const onSubmit = async () => {
    // send API request with the selected amount
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
        accessToken,
        params: { walletAddress: publicKey.toString(), projectSlug: slug },
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
      toggleExpressedInterestDialog()
    } catch (error) {
      console.error('Express interest error:', error)
      toast({
        description: error instanceof Error ? error.message : 'Failed to express interest. Please try again.',
        variant: 'error',
      })
    } finally {
      toggleLoading()
    }
  }

  const handleRedirectToProjectPage = async () => {
    refresh()
    setTimeout(() => push(RoutePath.InvestDetails(slug)), 100)
  }

  const handleChangeOtherInput = (value: number) => {
    if (value) {
      setOther(Math.abs(value))
    } else {
      setOther(undefined)
    }
  }

  return (
    <>
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
          value={other}
          onChange={(e) => handleChangeOtherInput(+e.target.value)}
          defaultValue={1}
          min={1}
          max={1000}
          className={`max-w-full border-green-genesis ${selectedOption?.label === 'Other' ? '' : 'hidden'}`}
        />
        {publicKey ? (
          <Button className='w-full h-12 bg-green-genesis text-black' onClick={onSubmit}>
            {isLoading ? <LoaderIcon /> : 'Express Interest'}
          </Button>
        ) : (
          <ConnectButton className='w-full h-12 bg-green-genesis text-black' text='Connect Wallet' />
        )}
      </div>
      {showExpressedInterestDialog && (
        <ExpressedInterestDialog
          slug={slug}
          open={showExpressedInterestDialog}
          toggleDialog={handleRedirectToProjectPage}
        />
      )}
    </>
  )
}

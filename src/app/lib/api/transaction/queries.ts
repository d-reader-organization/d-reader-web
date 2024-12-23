import { fetchWrapper } from '../../fetchWrapper'
import { Transaction } from '@solana/web3.js'
import { decodeTransaction } from '@/utils/transactions'
import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { MintParams } from '@/models/transaction/mint'
import { ExpressInterestParams } from '@/models/transaction/expressInterest'
import { TRANSACTION_QUERY_KEYS } from './keys'

const { TRANSACTION, MINT, USE_COMIC_ISSUE_ASSET, EXPRESS_INTEREST } = TRANSACTION_QUERY_KEYS

export const fetchMintTransaction = async ({
  params,
  accessToken,
}: {
  params: MintParams
  accessToken: string
}): Promise<{ data: string[]; error?: string }> => {
  const response = await fetchWrapper<string[]>({
    accessToken,
    path: `${TRANSACTION}/${MINT}`,
    params,
    timeoutInMiliseconds: 40000,
  })
  if (response.errorMessage) {
    return { data: [], error: response.errorMessage }
  }
  return { data: JSON.parse(JSON.stringify(response.data ?? [])) }
}

export const fetchUseComicIssueAssetTransaction = async ({
  accessToken,
  params,
}: {
  accessToken: string
  params: UseComicIssueAssetParams
}): Promise<Transaction | null> => {
  const response = await fetchWrapper<string | null>({
    accessToken,
    path: `${TRANSACTION}/${USE_COMIC_ISSUE_ASSET}`,
    params,
  })
  return response.data ? decodeTransaction(response.data, 'base64') : null
}

export const fetchExpressInterestTransaction = async ({
  accessToken,
  params,
}: {
  accessToken: string
  params: ExpressInterestParams
}) => {
  const response = await fetchWrapper<string>({
    accessToken,
    path: `${TRANSACTION}/${EXPRESS_INTEREST}`,
    params,
    isTextResponse: true,
  })
  return response
}

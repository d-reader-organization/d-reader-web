'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { MultipleBuyParams } from '@/models/transaction/multipleBuy'
import { Transaction } from '@solana/web3.js'
import { decodeTransaction } from '@/utils/transactions'
import { generateQueryParamsArray } from '@/utils/arrayQueryParams'
import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { MintParams } from '@/models/transaction/mint'
import { ExpressInterestParams } from '@/models/transaction/expressInterest'
import { TRANSACTION_QUERY_KEYS } from './keys'

const { TRANSACTION, MINT, MULTIPLE_BUY, USE_COMIC_ISSUE_ASSET, EXPRESS_INTEREST } = TRANSACTION_QUERY_KEYS

export const fetchMintTransaction = async (params: MintParams): Promise<{ data: string[]; error?: string }> => {
  const response = await fetchWrapper<string[]>({
    path: `${TRANSACTION}/${MINT}`,
    params,
    timeoutInMiliseconds: 40000,
  })
  if (response.errorMessage) {
    return { data: [], error: response.errorMessage }
  }
  return { data: JSON.parse(JSON.stringify(response.data ?? [])) }
}

export const fetchMultipleBuyTransaction = async (params: MultipleBuyParams): Promise<Transaction> => {
  const response = await fetchWrapper<string>({
    path: `${TRANSACTION}/${MULTIPLE_BUY}`,
    params: generateQueryParamsArray(params, 'instantBuyParams'),
  })
  return decodeTransaction(response.data ?? '', 'base64')
}

export const fetchUseComicIssueAssetTransaction = async (
  params: UseComicIssueAssetParams
): Promise<Transaction | null> => {
  const response = await fetchWrapper<string | null>({ path: `${TRANSACTION}/${USE_COMIC_ISSUE_ASSET}`, params })
  return response.data ? decodeTransaction(response.data, 'base64') : null
}

export const fetchExpressInterestTransaction = async (params: ExpressInterestParams) => {
  const response = await fetchWrapper<string>({
    path: `${TRANSACTION}/${EXPRESS_INTEREST}`,
    params,
    isTextResponse: true,
  })
  return response
}

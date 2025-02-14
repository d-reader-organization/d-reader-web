import { fetchWrapper } from '../../fetchWrapper'
import { MintParams } from '@/models/transaction/mint'
import { TRANSACTION_QUERY_KEYS } from './keys'
import { MultipleBuyParams } from '@/models/transaction/instantBuy'
import { ListParams } from '@/models/transaction/list'
import { TransactionHistoryItem } from '@/models/transaction/transactionHistory'
import { TransactionHistoryParams } from '@/models/transaction/transactionHistory'

const { TRANSACTION, MINT, DIRECT_BUY, LIST, HISTORY } = TRANSACTION_QUERY_KEYS

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

export const fetchDirectBuyTransaction = async ({
  params,
  accessToken,
}: {
  params: MultipleBuyParams
  accessToken: string
}): Promise<{ data: string[]; error?: string }> => {
  const response = await fetchWrapper<string[]>({
    accessToken,
    path: `${TRANSACTION}/${DIRECT_BUY}`,
    params,
    timeoutInMiliseconds: 40000,
  })
  if (response.errorMessage) {
    return { data: [], error: response.errorMessage }
  }
  return { data: JSON.parse(JSON.stringify(response.data ?? [])) }
}

export const fetchListAssetTransaction = async ({
  params,
  accessToken,
}: {
  params: ListParams
  accessToken: string
}): Promise<{ data: string; error?: string }> => {
  const response = await fetchWrapper<string>({
    accessToken,
    path: `${TRANSACTION}/${LIST}`,
    params,
    timeoutInMiliseconds: 40000,
    isTextResponse: true,
  })
  if (response.errorMessage) {
    return { data: '', error: response.errorMessage }
  }
  return { data: response.data || '' }
}

export const fetchTransactionHistory = async (params: TransactionHistoryParams): Promise<TransactionHistoryItem[]> => {
  const { data } = await fetchWrapper<TransactionHistoryItem[]>({
    params,
    path: `${TRANSACTION}/${HISTORY}`,
    revalidateCacheInSeconds: 5,
  })
  return data ?? []
}

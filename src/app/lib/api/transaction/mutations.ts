'use server'

import { UseComicIssueAssetParams } from '@/models/transaction/useComicIssueAsset'
import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'
import { TRANSACTION_QUERY_KEYS } from './keys'

const { TRANSACTION, USE_COMIC_ISSUE_ASSET, SEND_MINT_TRANSACTION } = TRANSACTION_QUERY_KEYS

export const sendMintTransaction = async (
  walletAddress: string,
  transactions: string[]
): Promise<string | undefined> => {
  const response = await fetchWrapper<void>({
    accessToken: await getAccessToken(),
    path: `${TRANSACTION}/${SEND_MINT_TRANSACTION}/${walletAddress}`,
    method: 'POST',
    body: { transactions },
    isTextResponse: true,
  })
  return response.errorMessage
}

export const unwrapComicIssueAsset = async ({
  accessToken,
  params,
}: {
  accessToken: string
  params: UseComicIssueAssetParams
}) => {
  const response = await fetchWrapper<void>({
    accessToken,
    path: `${TRANSACTION}/${USE_COMIC_ISSUE_ASSET}`,
    params,
    method: 'PATCH',
  })

  return response
}

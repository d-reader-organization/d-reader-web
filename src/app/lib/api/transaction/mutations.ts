'use server'

import { fetchWrapper } from '../../fetchWrapper'
import { getAccessToken } from '../../utils/auth'
import { TRANSACTION_QUERY_KEYS } from './keys'

const { TRANSACTION, SEND_MINT_TRANSACTION } = TRANSACTION_QUERY_KEYS

export const sendMintTransaction = async (
  walletAddress: string,
  transactions: string[]
): Promise<string | undefined> => {
  const response = await fetchWrapper<void>({
    accessToken: getAccessToken(),
    path: `${TRANSACTION}/${SEND_MINT_TRANSACTION}/${walletAddress}`,
    method: 'POST',
    body: { transactions },
    isTextResponse: true,
  })
  return response.errorMessage
}

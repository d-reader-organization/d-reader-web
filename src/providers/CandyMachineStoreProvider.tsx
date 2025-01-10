'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect, useCallback } from 'react'
import { useStore } from 'zustand'
import { type CandyMachineStore, createCandyMachineStore } from '@/stores/candy-machine-store'
import { ComicIssue } from '@/models/comicIssue'
import { useWallet } from '@solana/wallet-adapter-react'
import { CouponType } from '@/models/candyMachine/candyMachineCoupon'
import { getDefaultCoupon, isComicVaultCoupon } from '@/utils/mint'
import { fetchCandyMachine } from '@/app/lib/api/candyMachine/queries'
import { fetchSupportedTokens } from '@/app/lib/api/settings/queries'
import { isTokenValid } from '@/app/lib/utils/jwt'
import { SOL_ADDRESS } from '@/constants/general'

export type CandyMachineStoreApi = ReturnType<typeof createCandyMachineStore>

export const CandyMachineStoreContext = createContext<CandyMachineStoreApi | undefined>(undefined)

export type CandyMachineStoreProviderProps = {
  accessToken: string
  comicIssue: ComicIssue
  children: ReactNode
}

export const CandyMachineStoreProvider = ({ accessToken, comicIssue, children }: CandyMachineStoreProviderProps) => {
  const { publicKey } = useWallet()
  const storeRef = useRef<CandyMachineStoreApi>(null)

  if (!storeRef.current) {
    storeRef.current = createCandyMachineStore({
      coupons: [],
      isLoading: true,
      numberOfItems: 1,
      supportedTokens: [],
    })
  }

  const refetchCandyMachine = useCallback(async () => {
    const candyMachine = await fetchCandyMachine({
      accessToken,
      params: {
        candyMachineAddress: comicIssue?.collectibleInfo?.activeCandyMachineAddress ?? '',
        walletAddress: publicKey?.toBase58() ?? '',
      },
    })
    storeRef.current?.setState({
      candyMachine: candyMachine ?? storeRef.current.getState().candyMachine,
    })
    return candyMachine
  }, [accessToken, comicIssue?.collectibleInfo?.activeCandyMachineAddress, publicKey])

  useEffect(() => {
    const fetchAndStoreData = async () => {
      const candyMachine = await refetchCandyMachine()
      const supportedTokens = await fetchSupportedTokens()
      const isAuthenticated = !!accessToken && isTokenValid(accessToken)
      const defaultCoupon = getDefaultCoupon(candyMachine?.coupons ?? [], isAuthenticated)

      const solCurrencySetting = defaultCoupon?.prices.find((price) => price.splTokenAddress == SOL_ADDRESS)
      const coupons = (candyMachine?.coupons ?? []).filter(
        (coupon) => !(coupon.type === CouponType.PublicUser || isComicVaultCoupon(coupon))
      )

      storeRef.current?.setState({
        coupons,
        isLoading: false,
        numberOfItems: 1,
        supportedTokens,
        candyMachine: candyMachine ?? undefined,
        selectedCoupon: defaultCoupon,
        selectedCurrency: solCurrencySetting,
        refetchCandyMachine,
      })
    }
    fetchAndStoreData()
  }, [accessToken, refetchCandyMachine])

  return <CandyMachineStoreContext.Provider value={storeRef.current}>{children}</CandyMachineStoreContext.Provider>
}

export const useCandyMachineStore = <T,>(selector: (store: CandyMachineStore) => T): T => {
  const counterStoreContext = useContext(CandyMachineStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCandyMachineStore must be used within CandyMachineStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}

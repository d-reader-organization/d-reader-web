export {}

declare global {
  interface Window {
    intercomSettings: {
      api_base: string
      app_id: string
    }
    Intercom: (command: string, settings?: unknown) => void
    solana?: unknown
  }
}

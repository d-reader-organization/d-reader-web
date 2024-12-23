export const generateRandom = (max = 1, min = 0) => {
  return Math.floor(Math.random() * max + min)
}

type FormatCurrency = {
  value: number
  currency?: string
  currencyPosition?: CurrencyPosition
  divisor?: number
  fractionDigits?: number
}

type CurrencyPosition = 'left' | 'right'

export const formatCurrency = ({
  value,
  currency = '$',
  divisor = 1,
  fractionDigits = 2,
  currencyPosition = 'left',
}: FormatCurrency): string => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

  if (!value) return '-.--'

  const scaledValue = value / divisor

  if (currencyPosition === 'left') {
    return currency + numberFormatter.format(scaledValue) 
  }

  return numberFormatter.format(scaledValue) + currency
}

export const formatPercentage = (value: number): string => {
  return value.toString() + '%'
}

export const roundNumber = (number: number | null, maxDecimals = 1) => {
  if (!number) return number
  const decimalUnits = Math.pow(10, maxDecimals)
  return Math.round(number * decimalUnits) / decimalUnits
}

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString()
}

export const abbreviateNumber = (num: number) => {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const suffixNum = Math.floor(Math.log10(Math.abs(num)) / 3)

  const shortValue = parseFloat((suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3))
  if (shortValue % 1 !== 0) {
    return shortValue.toFixed(1) + suffixes[suffixNum]
  }

  return shortValue + suffixes[suffixNum]
}

import { describe, it, expect } from 'vitest'
import { fmtUSD } from '@utils/currency'

describe('fmtUSD', () => {
  it('formats whole numbers', () => {
    expect(fmtUSD.format(0)).toBe('$0.00')
    expect(fmtUSD.format(1)).toBe('$1.00')
    expect(fmtUSD.format(1000)).toBe('$1,000.00')
  })

  it('formats decimals with rounding', () => {
    expect(fmtUSD.format(1234.5)).toBe('$1,234.50')
    expect(fmtUSD.format(1234.56)).toBe('$1,234.56')
    expect(fmtUSD.format(1234.567)).toBe('$1,234.57') // rounds up
  })

  it('handles big numbers', () => {
    expect(fmtUSD.format(5_000_000)).toBe('$5,000,000.00')
  })

  it('handles negative values', () => {
    expect(fmtUSD.format(-42.4)).toBe('-$42.40')
  })
})

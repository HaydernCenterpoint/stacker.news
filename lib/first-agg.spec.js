/* eslint-env jest */
import { firstAggValue } from './first-agg'

describe('firstAggValue', () => {
  test('undefined on empty or missing rows', () => {
    expect(firstAggValue([], 'spent')).toBeUndefined()
    expect(firstAggValue(undefined, 'spent')).toBeUndefined()
    expect(firstAggValue(null, 'spent')).toBeUndefined()
  })

  test('reads the key from the first row', () => {
    expect(firstAggValue([{ spent: 10 }, { spent: 20 }], 'spent')).toBe(10)
    expect(firstAggValue([{ stacked: 0 }], 'stacked')).toBe(0)
  })
})

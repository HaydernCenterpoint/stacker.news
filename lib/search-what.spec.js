/* eslint-env jest */
import { itemSearchShortCircuit } from './search-what'

describe('itemSearchShortCircuit', () => {
  test('stackers is not an item-search type', () => {
    expect(itemSearchShortCircuit('stackers')).toBe(true)
  })

  test('posts/comments/all stay on item search', () => {
    expect(itemSearchShortCircuit('posts')).toBe(false)
    expect(itemSearchShortCircuit('comments')).toBe(false)
    expect(itemSearchShortCircuit('all')).toBe(false)
    expect(itemSearchShortCircuit(undefined)).toBe(false)
  })
})

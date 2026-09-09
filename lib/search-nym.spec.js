/* eslint-env jest */

import { nymClauses } from './search-nym'

describe('nymClauses', () => {
  test('returns no clauses when nym is missing', () => {
    expect(nymClauses()).toEqual({ filters: [], queries: [] })
    expect(nymClauses('')).toEqual({ filters: [], queries: [] })
    expect(nymClauses('@')).toEqual({ filters: [], queries: [] })
  })

  test('filters on the exact author, not a substring wildcard', () => {
    expect(nymClauses('@ek')).toEqual({
      filters: [{ term: { 'user.name': { value: 'ek', case_insensitive: true } } }],
      queries: []
    })
    const clause = nymClauses('@ek').filters[0]
    expect(JSON.stringify(clause)).not.toContain('*ek*')
  })

  test('preserves the nym spelling and relies on case_insensitive', () => {
    expect(nymClauses('@K00b').filters[0].term['user.name'].value).toBe('K00b')
  })
})

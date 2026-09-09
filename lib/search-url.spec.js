/* eslint-env jest */
import { urlQueries } from './search-url'

describe('urlQueries', () => {
  test('missing or empty operator adds no clauses', () => {
    expect(urlQueries(undefined)).toEqual([])
    expect(urlQueries('')).toEqual([])
    expect(urlQueries('url:')).toEqual([])
    expect(urlQueries('url:   ')).toEqual([])
  })

  test('empty host does not emit a match-all wildcard', () => {
    const clauses = urlQueries('url:')
    expect(JSON.stringify(clauses)).not.toContain('**')
  })

  test('a host still scores with prefix and wildcard', () => {
    const clauses = urlQueries('url:stacker.news')
    expect(clauses.some(c => c.match_bool_prefix?.url?.query === 'stacker.news')).toBe(true)
    expect(clauses.some(c => c.wildcard?.url?.value === '*stacker.news*')).toBe(true)
  })
})

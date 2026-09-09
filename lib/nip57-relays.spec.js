/* eslint-env jest */

import { DEFAULT_CROSSPOSTING_RELAYS } from './nostr'
import { relaysForNip57Receipt } from './nip57-relays'

describe('relaysForNip57Receipt', () => {
  test('uses the relays tag when present', () => {
    const note = {
      tags: [
        ['p', 'cd'.repeat(32)],
        ['relays', 'wss://relay.example/', 'wss://other.example/']
      ]
    }
    expect(relaysForNip57Receipt(note)).toEqual([
      'wss://relay.example/',
      'wss://other.example/'
    ])
  })

  test('falls back when the relays tag is missing', () => {
    const note = { tags: [['p', 'cd'.repeat(32)], ['amount', '21000']] }
    expect(relaysForNip57Receipt(note)).toEqual(DEFAULT_CROSSPOSTING_RELAYS)
  })

  test('falls back when the relays tag is empty or malformed', () => {
    expect(relaysForNip57Receipt({ tags: [['relays']] })).toEqual(DEFAULT_CROSSPOSTING_RELAYS)
    expect(relaysForNip57Receipt({ tags: [['relays', '']] })).toEqual(DEFAULT_CROSSPOSTING_RELAYS)
    expect(relaysForNip57Receipt({ tags: null })).toEqual(DEFAULT_CROSSPOSTING_RELAYS)
    expect(relaysForNip57Receipt({})).toEqual(DEFAULT_CROSSPOSTING_RELAYS)
  })
})

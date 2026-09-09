/* eslint-env jest */

import { DEFAULT_CROSSPOSTING_RELAYS, NOSTR_MAX_RELAY_NUM } from './nostr'
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

  test('drops invalid and non-websocket values', () => {
    const note = {
      tags: [[
        'relays',
        'http://evil.example/',
        'javascript:alert(1)',
        'wss://relay.example/',
        'relay.damus.io'
      ]]
    }
    expect(relaysForNip57Receipt(note)).toEqual([
      'wss://relay.example/',
      'wss://relay.damus.io'
    ])
  })

  test('caps relay fanout', () => {
    const extras = Array.from({ length: NOSTR_MAX_RELAY_NUM + 5 }, (_, i) => `wss://r${i}.example/`)
    expect(relaysForNip57Receipt({ tags: [['relays', ...extras]] })).toEqual(
      extras.slice(0, NOSTR_MAX_RELAY_NUM)
    )
  })
})

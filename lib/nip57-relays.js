import { DEFAULT_CROSSPOSTING_RELAYS } from './nostr'

export function relaysForNip57Receipt (note, fallback = DEFAULT_CROSSPOSTING_RELAYS) {
  const relaysTag = note?.tags?.find(t => Array.isArray(t) && t.length >= 2 && t[0] === 'relays')
  const relays = (relaysTag ? relaysTag.slice(1) : fallback).filter(r => typeof r === 'string' && r.length)
  return relays.length ? relays : fallback
}

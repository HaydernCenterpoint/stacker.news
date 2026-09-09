import { DEFAULT_CROSSPOSTING_RELAYS, NOSTR_MAX_RELAY_NUM } from './nostr'

function normalizeRelayUrl (relay) {
  if (typeof relay !== 'string') return null
  const trimmed = relay.trim()
  if (!trimmed) return null
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) && !/^wss?:\/\//i.test(trimmed)) return null
  const candidate = /^wss?:\/\//i.test(trimmed) ? trimmed : `wss://${trimmed}`
  try {
    const url = new URL(candidate)
    if (url.protocol !== 'wss:' && url.protocol !== 'ws:') return null
    if (!url.hostname) return null
    return candidate
  } catch {
    return null
  }
}

function sanitizeRelays (relays, fallback) {
  const cleaned = []
  for (const relay of relays || []) {
    const normalized = normalizeRelayUrl(relay)
    if (!normalized) continue
    if (cleaned.includes(normalized)) continue
    cleaned.push(normalized)
    if (cleaned.length >= NOSTR_MAX_RELAY_NUM) break
  }
  return cleaned.length ? cleaned : fallback
}

export function relaysForNip57Receipt (note, fallback = DEFAULT_CROSSPOSTING_RELAYS) {
  const relaysTag = note?.tags?.find(t => Array.isArray(t) && t.length >= 2 && t[0] === 'relays')
  return sanitizeRelays(relaysTag ? relaysTag.slice(1) : fallback, fallback)
}

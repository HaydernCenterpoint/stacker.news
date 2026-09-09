import { parse } from 'tldts'

// url:foo is a scoring hint, not a hard filter. An empty host must not
// become wildcard ** which matches every document.

export function urlQueries (url) {
  if (!url) return []
  let uri = url.slice(4).trim()
  if (!uri) return []
  const queries = [
    { match_bool_prefix: { url: { query: uri, operator: 'and', boost: 1000 } } }
  ]
  const parsed = parse(uri)
  if (parsed?.subdomain?.length > 0) {
    uri = uri.replace(`${parsed.subdomain}.`, '')
  }
  queries.push({ wildcard: { url: { value: `*${uri}*` } } })
  return queries
}

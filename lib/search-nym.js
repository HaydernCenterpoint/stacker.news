// @nym is an exact author filter. A wildcard *name* match lets
// @ek also return @hynek / @gkrizek, which is obvious when sorting by sats.

export function nymClauses (nym) {
  if (!nym) return { filters: [], queries: [] }
  const name = nym.slice(1)
  if (!name) return { filters: [], queries: [] }
  return {
    filters: [{ term: { 'user.name': { value: name, case_insensitive: true } } }],
    queries: []
  }
}

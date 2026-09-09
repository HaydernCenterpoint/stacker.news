// $queryRaw GROUP BY aggregates return [] when the user has no matching rows.
// `const [{ spent }] = rows` then throws and GSSP 404s /stackers/search.

export function firstAggValue (rows, key) {
  if (!Array.isArray(rows) || rows.length === 0) return
  return rows[0][key]
}

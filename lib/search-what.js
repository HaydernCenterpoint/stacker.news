// Item search has no user index. The UI routes what=stackers to
// /stackers/search (searchUsers). Passing it into item search used to
// leak posts because typeFilter's default is "no extra type clause".

export function itemSearchShortCircuit (what) {
  return what === 'stackers'
}

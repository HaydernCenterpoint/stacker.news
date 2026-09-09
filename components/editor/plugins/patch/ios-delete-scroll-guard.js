import { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { CAN_USE_BEFORE_INPUT, IS_IOS } from '@lexical/utils'

/**
 * iOS Safari / PWA: after native deleteContentBackward, WebKit may refocus the
 * editor root and scroll it into view. preventScroll is ignored, so a tall
 * comment jumps to the top of the editor. Snapshot scrollY on delete and
 * restore it if the window jumped.
 *
 * Closes #3130. Previous PR #3201 closed unmerged.
 */

const GUARD_WINDOW_MS = 150
const MIN_JUMP_PX = 40

let installed = false
let anchorY = null
let armedUntil = 0

function onBeforeInput (e) {
  if (!e.inputType || !e.inputType.startsWith('delete')) return
  anchorY = window.scrollY
  armedUntil = Date.now() + GUARD_WINDOW_MS
}

function onScroll () {
  if (anchorY === null) return
  if (Date.now() > armedUntil || Math.abs(window.scrollY - anchorY) < MIN_JUMP_PX) return
  const y = anchorY
  anchorY = null
  window.scrollTo(0, y)
}

function install () {
  if (installed) return
  installed = true
  document.addEventListener('beforeinput', onBeforeInput, true)
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function IOSDeleteScrollGuardPlugin () {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!IS_IOS || !CAN_USE_BEFORE_INPUT) return
    install()
  }, [editor])

  return null
}

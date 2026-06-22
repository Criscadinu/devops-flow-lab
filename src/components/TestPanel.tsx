'use client'

import { useState, useEffect, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { resetAllMissions, completeFirstWay, completeSecondWay, completeThirdWay } from '@/app/actions/testControls'
import { resetOnboarding } from '@/app/actions/progress'

const ALLOWED = ['cris.g.cadinu', 'agilefanatics']
const SEQUENCE = 'devops'
const CLICK_THRESHOLD = 5
const CLICK_WINDOW_MS = 2000

const BUTTONS = [
  { label: 'Reset all',            action: () => resetAllMissions()   },
  { label: 'Reset Onboarding',     action: () => resetOnboarding()    },
  { label: 'Complete First Way',   action: () => completeFirstWay()   },
  { label: 'Complete Second Way',  action: () => completeSecondWay()  },
  { label: 'Complete all',         action: () => completeThirdWay()   },
]

export function TestPanel({ email }: { email: string }) {
  if (!ALLOWED.some((d) => email.includes(d))) return null
  const [visible, setVisible]      = useState(false)
  const [seq, setSeq]              = useState('')
  const [pending, startTransition] = useTransition()
  const router                     = useRouter()
  const clickTimestamps            = useRef<number[]>([])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      setSeq((prev) => {
        const next = (prev + e.key).slice(-SEQUENCE.length)
        console.log('[TestPanel] key:', JSON.stringify(e.key), '→ buffer:', JSON.stringify(next))
        if (next === SEQUENCE) {
          console.log('[TestPanel] sequence detected — showing panel')
          setVisible(true)
        }
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleFallbackClick() {
    const now = Date.now()
    clickTimestamps.current = [...clickTimestamps.current, now].filter(
      (t) => now - t < CLICK_WINDOW_MS
    )
    console.log('[TestPanel] fallback clicks in window:', clickTimestamps.current.length)
    if (clickTimestamps.current.length >= CLICK_THRESHOLD) {
      console.log('[TestPanel] fallback threshold reached — showing panel')
      clickTimestamps.current = []
      setVisible(true)
    }
  }

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action()
      router.refresh()
    })
  }

  return (
    <>
      {/* Invisible fallback trigger — 5 rapid clicks */}
      <button
        onClick={handleFallbackClick}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: 1,
          height: 1,
          opacity: 0,
          cursor: 'default',
          border: 'none',
          padding: 0,
          background: 'none',
          zIndex: 9998,
        }}
      />

      {/* Panel */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(255,85,0,0.45)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.85)',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            minWidth: 210,
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ color: 'rgb(255,85,0)', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ▸ Test Panel
            </span>
            <button
              onClick={() => setVisible(false)}
              aria-label="Close"
              style={{ background: 'none', border: 'none', color: 'rgb(75,85,99)', cursor: 'pointer', fontSize: 13, lineHeight: 1, padding: 2 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgb(209,213,219)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgb(75,85,99)' }}
            >
              ✕
            </button>
          </div>

          <div style={{ borderTop: '1px solid rgb(31,41,55)' }} />

          {/* Buttons */}
          {BUTTONS.map(({ label, action }) => (
            <button
              key={label}
              disabled={pending}
              onClick={() => run(action)}
              style={{
                backgroundColor: '#111',
                border: '1px solid rgb(31,41,55)',
                color: pending ? 'rgb(55,65,81)' : 'rgb(156,163,175)',
                fontFamily: 'monospace',
                fontSize: 11,
                padding: '6px 10px',
                textAlign: 'left',
                cursor: pending ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!pending) {
                  e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)'
                  e.currentTarget.style.color = 'rgb(255,85,0)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgb(31,41,55)'
                e.currentTarget.style.color = pending ? 'rgb(55,65,81)' : 'rgb(156,163,175)'
              }}
            >
              {pending ? '...' : label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

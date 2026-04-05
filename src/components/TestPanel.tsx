'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { resetAllMissions, completeUntilMission } from '@/app/actions/testControls'

const SEQUENCE = 'devops'

const BUTTONS = [
  { label: 'Reset all',          action: () => resetAllMissions()              },
  { label: 'Complete M-01',      action: () => completeUntilMission('M-01')    },
  { label: 'Complete to M-03',   action: () => completeUntilMission('M-03')    },
  { label: 'Complete to M-07',   action: () => completeUntilMission('M-07')    },
]

export function TestPanel() {
  const [visible, setVisible]   = useState(false)
  const [seq, setSeq]           = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      setSeq((prev) => {
        const next = (prev + e.key).slice(-SEQUENCE.length)
        if (next === SEQUENCE) setVisible(true)
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!visible) return null

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action()
      router.refresh()
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(6,182,212,0.45)',
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
        <span style={{ color: 'rgb(6,182,212)', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
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
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.5)'
              e.currentTarget.style.color = 'rgb(6,182,212)'
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
  )
}

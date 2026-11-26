import { useEffect } from 'react'

/** Calls onPrev / onNext for the ← and → keys. */
export default function useArrowKeys(onPrev, onNext) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext])
}

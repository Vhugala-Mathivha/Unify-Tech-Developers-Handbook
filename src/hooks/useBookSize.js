import { useEffect, useState } from 'react'
import { MAX_PAGE_HEIGHT, PAGE_ASPECT } from '../config/book'

const MIN_TWO_PAGE_WIDTH = 2 * 300 + 64

function measure() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const wide = vw >= MIN_TWO_PAGE_WIDTH

  let height = Math.min(MAX_PAGE_HEIGHT, vh - 150)
  let width = Math.round(height * PAGE_ASPECT)
  const maxWidth = wide ? Math.floor((vw - 64) / 2) : vw - 40
  if (width > maxWidth) {
    width = maxWidth
    height = Math.round(width / PAGE_ASPECT)
  }
  return { width: Math.max(width, 220), height: Math.max(height, 314), wide }
}

/** Page size that fits the viewport; `wide` = room for a two-page spread. */
export default function useBookSize() {
  const [size, setSize] = useState(measure)

  useEffect(() => {
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setSize(measure()), 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

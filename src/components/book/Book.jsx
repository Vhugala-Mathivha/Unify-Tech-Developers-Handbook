import { useCallback, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { BACK_COVER, FLIP_MS, FRONT_COVER, INSIDE_BACK, leafOf } from '../../config/book'
import { bookPages } from '../../book/pages'
import { BookNavContext } from '../../book/BookNav'
import useBookSize from '../../hooks/useBookSize'
import useArrowKeys from '../../hooks/useArrowKeys'
import { playFlipSound } from '../../lib/flipSound'
import FrontCover from '../covers/FrontCover'
import BackCover from '../covers/BackCover'
import DedicationPage from '../pages/DedicationPage'
import ContentsPage from '../pages/ContentsPage'
import EndPage from '../pages/EndPage'
import TocPage from '../pages/TocPage'
import ChapterTextPage from '../chapter/ChapterTextPage'
import ChapterCodePage from '../chapter/ChapterCodePage'
import BookPage from './BookPage'
import BookControls from './BookControls'
import spreadLabel from './spreadLabel'
import './Book.css'

// What each kind of printed page renders. Page numbers are printed on
// contents pages but not on the dedication or blank pages, like a real book.
function renderPage(page) {
  switch (page.type) {
    case 'dedication':
      return <DedicationPage />
    case 'contents':
      return <ContentsPage />
    case 'toc':
      return <TocPage category={page.category} groups={page.groups} continued={page.continued} />
    case 'chapter':
      return <ChapterTextPage chapter={page.chapter} spread={page.spread} part={page.part} parts={page.parts} />
    case 'end':
      return <EndPage />
    case 'chapter-code':
      return <ChapterCodePage chapter={page.chapter} spread={page.spread} />
    default:
      return null
  }
}
const NUMBERED = new Set(['contents', 'toc', 'chapter', 'chapter-code'])

// Built once: leaves never change, only the engine's position in them.
const leaves = [
  <BookPage key="front" side="right" variant="cover">
    <FrontCover />
  </BookPage>,
  <BookPage key="inside-front" side="left" variant="endpaper" />,
  ...bookPages.map((page) => (
    <BookPage
      key={page.key}
      side={page.number % 2 ? 'right' : 'left'}
      number={NUMBERED.has(page.type) ? page.number : null}
    >
      {renderPage(page)}
    </BookPage>
  )),
  <BookPage key="inside-back" side={bookPages.length % 2 ? 'left' : 'right'} variant="endpaper" />,
  <BookPage key="back" side="left" variant="cover">
    <BackCover />
  </BookPage>,
]

export default function Book() {
  const size = useBookSize()
  const flipbookRef = useRef(null)

  // `page`: leaf the engine settled on (drives labels / buttons).
  // `visual`: what the shell should look like; it changes at the *start* of a
  // flip so the book slides open/closed while the cover is turning.
  const [page, setPage] = useState(FRONT_COVER)
  const [visual, setVisual] = useState(FRONT_COVER)
  const [portrait, setPortrait] = useState(!size.wide)
  const [sound, setSound] = useState(true)

  const pageRef = useRef(FRONT_COVER)
  const directionRef = useRef(0)
  const soundRef = useRef(sound)
  soundRef.current = sound

  const flip = useCallback((direction) => {
    directionRef.current = direction
    const engine = flipbookRef.current?.pageFlip()
    if (direction > 0) engine?.flipNext('bottom')
    else engine?.flipPrev('bottom')
  }, [])
  const next = useCallback(() => flip(1), [flip])
  const prev = useCallback(() => flip(-1), [flip])
  useArrowKeys(prev, next)

  // Jump straight to a printed page (used by table-of-contents links).
  const nav = useMemo(
    () => ({
      goToPage: (pageNumber) => flipbookRef.current?.pageFlip()?.flip(leafOf(pageNumber), 'top'),
    }),
    [],
  )

  const handleFlip = (e) => {
    pageRef.current = e.data
    directionRef.current = 0
    setPage(e.data)
    setVisual(e.data)
  }

  const handleStateChange = (e) => {
    if (e.data !== 'flipping') return
    if (soundRef.current) playFlipSound()

    const current = pageRef.current
    const direction = directionRef.current
    if (current === FRONT_COVER) setVisual(FRONT_COVER + 1)
    else if (current >= BACK_COVER) setVisual(INSIDE_BACK)
    // Button/keyboard flips know their direction, so closing can start early too.
    else if (direction < 0 && current <= 2) setVisual(FRONT_COVER)
    else if (direction > 0 && current >= INSIDE_BACK - 1) setVisual(BACK_COVER)
  }

  const shell = portrait
    ? 'portrait'
    : visual === FRONT_COVER
      ? 'front'
      : visual >= BACK_COVER
        ? 'back'
        : 'open'

  // In landscape the engine renders a two-page-wide stage; a closed book only
  // fills one half of it, so slide the stage to keep the book centred.
  const shift = shell === 'front' ? -size.width / 2 : shell === 'back' ? size.width / 2 : 0

  return (
    <BookNavContext.Provider value={nav}>
      <div className="book-scene">
        <div
          className={`book book--${shell}`}
          style={{
            '--flip-ms': `${FLIP_MS}ms`,
            width: portrait ? size.width : size.width * 2,
            height: size.height,
            transform: `translateX(${shift}px)`,
          }}
        >
          <div className="book__body" aria-hidden="true" />
          <HTMLFlipBook
            key={`${size.width}x${size.height}`}
            ref={flipbookRef}
            className="book__pages"
            style={{}}
            width={size.width}
            height={size.height}
            size="fixed"
            minWidth={size.width}
            maxWidth={size.width}
            minHeight={size.height}
            maxHeight={size.height}
            autoSize={false}
            startPage={pageRef.current}
            startZIndex={2}
            showCover
            usePortrait={!size.wide}
            drawShadow
            maxShadowOpacity={0.45}
            flippingTime={FLIP_MS}
            showPageCorners
            useMouseEvents
            clickEventForward
            disableFlipByClick={false}
            mobileScrollSupport
            swipeDistance={30}
            onFlip={handleFlip}
            onChangeState={handleStateChange}
            onChangeOrientation={(e) => setPortrait(e.data === 'portrait')}
            onInit={(e) => setPortrait(e.data?.mode === 'portrait')}
          >
            {leaves}
          </HTMLFlipBook>
        </div>

        <BookControls
          label={spreadLabel(page, portrait)}
          canPrev={page > FRONT_COVER}
          canNext={page < BACK_COVER}
          onPrev={prev}
          onNext={next}
          sound={sound}
          onToggleSound={() => setSound((s) => !s)}
        />
      </div>
    </BookNavContext.Provider>
  )
}

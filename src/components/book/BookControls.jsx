import './BookControls.css'

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    {children}
  </svg>
)

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

export default function BookControls({ label, canPrev, canNext, onPrev, onNext, sound, onToggleSound }) {
  return (
    <div className="book-controls">
      <nav className="book-controls__nav" aria-label="Book navigation">
        <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Previous page">
          <Icon>
            <path d="M15 5l-7 7 7 7" strokeWidth="2" {...stroke} />
          </Icon>
        </button>
        <span className="book-controls__label" aria-live="polite">
          {label}
        </span>
        <button type="button" onClick={onNext} disabled={!canNext} aria-label="Next page">
          <Icon>
            <path d="M9 5l7 7-7 7" strokeWidth="2" {...stroke} />
          </Icon>
        </button>
        <button
          type="button"
          className="book-controls__sound"
          onClick={onToggleSound}
          aria-pressed={sound}
          aria-label={sound ? 'Mute page sound' : 'Unmute page sound'}
          title={sound ? 'Sound on' : 'Sound off'}
        >
          <Icon>
            <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
            {sound ? (
              <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" strokeWidth="1.8" {...stroke} />
            ) : (
              <path d="M16 9l5 6M21 9l-5 6" strokeWidth="1.8" {...stroke} />
            )}
          </Icon>
        </button>
      </nav>
      <p className="book-controls__hint">Click a page corner, drag, or use ← → to turn pages</p>
    </div>
  )
}

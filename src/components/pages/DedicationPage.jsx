import { dedication } from '../../data/book'
import './DedicationPage.css'

/** Special message page: heading at the top, italic message in the middle. */
export default function DedicationPage() {
  return (
    <div className="dedication">
      <h2 className="dedication__heading">{dedication.heading}</h2>
      <p className="dedication__message">
        {dedication.message}{' '}
        <span className="dedication__thanks">
          {dedication.thanks}{' '}
          <svg className="dedication__heart" viewBox="0 0 24 22" role="img" aria-label="love">
            {/* simple solid heart drawn to match the text, not an emoji */}
            <path d="M12 21.2 10.6 20C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.6 11.5L12 21.2Z" />
          </svg>
        </span>
      </p>
    </div>
  )
}

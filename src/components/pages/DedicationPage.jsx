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
          {dedication.thanks} <span aria-label="love">❤️</span>
        </span>
      </p>
    </div>
  )
}

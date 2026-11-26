import { dedication } from '../../data/book'
import './DedicationPage.css'

/** Special message page: heading at the top, message at the foot in italics. */
export default function DedicationPage() {
  return (
    <div className="dedication">
      <h2 className="dedication__heading">{dedication.heading}</h2>
      <p className="dedication__message">{dedication.message}</p>
    </div>
  )
}

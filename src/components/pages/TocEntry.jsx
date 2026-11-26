import { useBookNav } from '../../book/BookNav'

/**
 * One table-of-contents line: title, dotted leader, page number.
 * With a page number it's a button that flips the book there; without one
 * (chapter not written yet) it shows "soon" and isn't clickable.
 *
 * It must be a <button>: the flip engine forwards clicks on buttons instead of
 * treating them as a page turn. Unwritten entries use aria-disabled rather than
 * `disabled`, because a disabled button passes its clicks to the page (which
 * would turn it).
 */
export default function TocEntry({ title, page, lead }) {
  const { goToPage } = useBookNav()
  const ready = page != null

  return (
    <li className={`toc-entry ${lead ? 'toc-entry--lead' : ''}`}>
      <button
        type="button"
        className="toc-entry__link"
        aria-disabled={!ready}
        onClick={() => ready && goToPage(page)}
        aria-label={ready ? `${title}, page ${page}` : `${title}, coming soon`}
      >
        {lead && <span className="toc-entry__lead">{lead}</span>}
        <span className="toc-entry__title">{title}</span>
        <span className="toc-entry__dots" aria-hidden="true" />
        <span className="toc-entry__page">{ready ? page : 'soon'}</span>
      </button>
    </li>
  )
}

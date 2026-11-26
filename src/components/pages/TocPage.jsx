import { pageNumberFor } from '../../book/pages'
import TocEntry from './TocEntry'
import './toc.css'

/**
 * One contents page for a category. Long categories run over several pages;
 * later pages are marked "continued", as is a group that carries over.
 */
export default function TocPage({ category, groups, continued }) {
  return (
    <div className="toc">
      <header className="toc__header">
        <p className="toc__overline">
          Contents <span aria-hidden="true">·</span> {category.number}
          {continued && (
            <>
              {' '}
              <span aria-hidden="true">·</span> continued
            </>
          )}
        </p>
        <h2 className="toc__title">{category.title}</h2>
      </header>

      {groups.map((group) => (
        <section key={group.title} className="toc__group">
          <h3 className="toc__group-title">
            {group.title}
            {group.continued && <span className="toc__continued"> (continued)</span>}
          </h3>
          <ul className="toc__entries">
            {group.entries.map((entry) => (
              <TocEntry
                key={entry.title}
                title={entry.title}
                page={entry.pageId ? pageNumberFor(entry.pageId) : null}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

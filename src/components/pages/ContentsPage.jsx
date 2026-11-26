import { tocCategories } from '../../data/contents'
import { categoryStartPage } from '../../book/pages'
import TocEntry from './TocEntry'
import './toc.css'

/** Contents overview: the five categories, each linking to its contents page. */
export default function ContentsPage() {
  return (
    <div className="toc">
      <header className="toc__header">
        <h2 className="toc__title toc__title--contents">Contents</h2>
      </header>

      <ol className="toc__overview">
        {tocCategories.map((c) => (
          <li key={c.id} className="toc__category">
            <ul className="toc__entries">
              <TocEntry lead={c.number} title={c.title} page={categoryStartPage[c.id]} />
            </ul>
            <p className="toc__summary">{c.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

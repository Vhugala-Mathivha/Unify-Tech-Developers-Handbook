import { tocCategories } from '../../data/contents'
import { chapterTitle } from '../../data/chapters'
import { pageNumberFor } from '../../book/pages'
import { useBookNav } from '../../book/BookNav'
import ChapterVisual from './visuals/ChapterVisual'
import './chapter.css'

const categoryById = Object.fromEntries(tocCategories.map((c) => [c.id, c]))

/** "See also" links to related chapters. Buttons, so the flip engine leaves the click alone. */
function SeeAlso({ ids }) {
  const { goToPage } = useBookNav()
  const links = ids.map((id) => ({ id, title: chapterTitle[id], page: pageNumberFor(id) })).filter((l) => l.page)
  if (!links.length) return null
  return (
    <p className="chapter__see-also">
      <span className="chapter__see-also-label">See also</span>
      {links.map((link) => (
        <button key={link.id} type="button" className="chapter__see-also-link" onClick={() => goToPage(link.page)}>
          <span>{link.title}</span> <span className="chapter__see-also-page">p. {link.page}</span>
        </button>
      ))}
    </p>
  )
}

/**
 * Left page of a chapter spread: overline, title, explanation, visual, key points.
 * Later spreads of a multi-spread chapter show the chapter name and "part n of m"
 * above their own heading.
 */
export default function ChapterTextPage({ chapter, spread, part = 1, parts = 1 }) {
  const category = categoryById[chapter.category]
  const s = spread ?? chapter
  return (
    <article className="chapter">
      <p className="chapter__overline">
        {category.number} <span aria-hidden="true">·</span> {category.title}{' '}
        <span aria-hidden="true">·</span> {chapter.group}
      </p>

      {part === 1 ? (
        <>
          <h2 className="chapter__title">{chapter.title}</h2>
          {s.heading && <p className="chapter__subtitle">{s.heading}</p>}
        </>
      ) : (
        <>
          <p className="chapter__kicker">
            {chapter.title} <span aria-hidden="true">·</span> part {part} of {parts}
          </p>
          <h2 className="chapter__title chapter__title--part">{s.heading}</h2>
        </>
      )}

      {s.intro.map((text) => (
        <p key={text} className="chapter__text">
          {text}
        </p>
      ))}

      {s.visual && <ChapterVisual visual={s.visual} />}

      {s.points?.length > 0 && (
        <section className="chapter__points">
          <h3 className="chapter__points-title">Key points</h3>
          <ul>
            {s.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {s.related?.length > 0 && <SeeAlso ids={s.related} />}

      {parts > 1 && part < parts && <p className="chapter__continues">Continues over the page →</p>}
    </article>
  )
}

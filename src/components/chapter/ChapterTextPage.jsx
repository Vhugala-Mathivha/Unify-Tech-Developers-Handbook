import { tocCategories } from '../../data/contents'
import ChapterVisual from './visuals/ChapterVisual'
import './chapter.css'

const categoryById = Object.fromEntries(tocCategories.map((c) => [c.id, c]))

/** Left page of a chapter spread: overline, title, explanation, visual, key points. */
export default function ChapterTextPage({ chapter }) {
  const category = categoryById[chapter.category]
  return (
    <article className="chapter">
      <p className="chapter__overline">
        {category.number} <span aria-hidden="true">·</span> {category.title}{' '}
        <span aria-hidden="true">·</span> {chapter.group}
      </p>
      <h2 className="chapter__title">{chapter.title}</h2>

      {chapter.intro.map((text) => (
        <p key={text} className="chapter__text">
          {text}
        </p>
      ))}

      {chapter.visual && <ChapterVisual name={chapter.visual} />}

      {chapter.points?.length > 0 && (
        <section className="chapter__points">
          <h3 className="chapter__points-title">Key points</h3>
          <ul>
            {chapter.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

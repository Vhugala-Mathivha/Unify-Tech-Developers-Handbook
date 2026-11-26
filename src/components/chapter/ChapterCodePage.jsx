import CodeBlock from './CodeBlock'
import ScreenImage from './ScreenImage'
import './chapter.css'

/** Right page of a chapter spread: the screen in ARMS (if any), then the code behind it. */
export default function ChapterCodePage({ chapter, spread }) {
  const s = spread ?? chapter
  return (
    <article className="chapter chapter--code">
      {s.screen && (
        <>
          <h3 className="chapter__label">On screen</h3>
          <ScreenImage {...s.screen} />
        </>
      )}

      <h3 className={`chapter__label ${s.screen ? 'chapter__label--code' : ''}`}>In the code</h3>
      <div className="chapter__code">
        {s.snippets.map((id) => (
          <CodeBlock key={id} id={id} />
        ))}
      </div>
    </article>
  )
}

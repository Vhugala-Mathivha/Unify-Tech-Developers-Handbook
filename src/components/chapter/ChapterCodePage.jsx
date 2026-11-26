import CodeBlock from './CodeBlock'
import ScreenImage from './ScreenImage'
import './chapter.css'

/** Right page of a chapter spread: the screen in ARMS, then the code behind it. */
export default function ChapterCodePage({ chapter }) {
  return (
    <article className="chapter chapter--code">
      <h3 className="chapter__label">On screen</h3>
      <ScreenImage {...chapter.screen} />

      <h3 className="chapter__label chapter__label--code">In the code</h3>
      <div className="chapter__code">
        {chapter.snippets.map((id) => (
          <CodeBlock key={id} id={id} />
        ))}
      </div>
    </article>
  )
}

import { Fragment } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import snippets from '../../data/snippets.json'
import '../../lib/prismCsharp'
import './code.css'

/** Wraps a handbook note in the comment syntax of the snippet's language. */
function asComment(text, language) {
  if (language === 'css') return `/* ${text} */`
  if (language === 'markup') return `<!-- ${text} -->`
  return `// ${text}`
}

/**
 * A code excerpt styled like VS Code (Dark+): file path as the tab,
 * real line numbers from the source file, syntax colours.
 *
 * Handbook notes (`notes` in the snippet) are extra explanation lines placed
 * after the line they describe. They have no line number and a gold marker,
 * so they can't be mistaken for the real code.
 */
export default function CodeBlock({ id }) {
  const snippet = snippets[id]
  if (!snippet) return null
  const { repo, file, from, language, code, notes = {} } = snippet
  const to = from + code.split('\n').length - 1

  return (
    <figure className="code">
      <figcaption className="code__tab">
        <span className="code__repo">{repo}</span>
        <span className="code__file">{file}</span>
        <span className="code__lines">
          L{from}–{to}
        </span>
      </figcaption>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="code__body">
            {tokens.map((line, i) => {
              const number = from + i
              const note = notes[number]
              return (
                <Fragment key={i}>
                  <div {...getLineProps({ line })} className="code__line">
                    <span className="code__number" aria-hidden="true">
                      {number}
                    </span>
                    <span className="code__text">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                  {note && (
                    <div className="code__line code__line--note">
                      <span className="code__number" aria-hidden="true">
                        ✎
                      </span>
                      <span className="code__text">
                        <span className="visually-hidden">Handbook note: </span>
                        {asComment(note, language)}
                      </span>
                    </div>
                  )}
                </Fragment>
              )
            })}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

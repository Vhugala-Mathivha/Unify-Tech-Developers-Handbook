import { Highlight, themes } from 'prism-react-renderer'
import snippets from '../../data/snippets.json'
import './code.css'

/**
 * A code excerpt styled like VS Code (Dark+): file path as the tab,
 * real line numbers from the source file, syntax colours.
 */
export default function CodeBlock({ id }) {
  const snippet = snippets[id]
  if (!snippet) return null
  const { repo, file, from, language, code } = snippet
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
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="code__line">
                <span className="code__number" aria-hidden="true">
                  {from + i}
                </span>
                <span className="code__text">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}

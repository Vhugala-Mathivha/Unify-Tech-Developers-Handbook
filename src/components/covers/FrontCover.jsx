import { authors } from '../../data/authors'
import { authorCredit, bookTitle } from '../../data/book'
import AuthorPhoto from '../authors/AuthorPhoto'
import AuthorCaption from '../authors/AuthorCaption'
import './FrontCover.css'

const rows = [authors.slice(0, 3), authors.slice(3)]

export default function FrontCover() {
  return (
    <div className="front-cover">
      <header className="front-cover__top">
        <h1 className="front-cover__title" aria-label={`${bookTitle.main} - ${bookTitle.sub}`}>
          <span className="front-cover__title-main">{bookTitle.main}</span>
          <span className="front-cover__title-sub">{bookTitle.sub}</span>
        </h1>
        <p className="front-cover__credit">{authorCredit}</p>
      </header>

      <section className="front-cover__authors" aria-label="Authors">
        {rows.map((row, i) => (
          <div className="front-cover__row" key={i}>
            {row.map((author) => (
              <figure className="front-cover__author" key={author.id}>
                <AuthorPhoto author={author} />
                <AuthorCaption author={author} as="figcaption" />
              </figure>
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}

import { authors } from '../../data/authors'
import { backCoverHeading } from '../../data/book'
import AuthorPhoto from '../authors/AuthorPhoto'
import AuthorCaption from '../authors/AuthorCaption'
import './BackCover.css'

export default function BackCover() {
  return (
    <div className="back-cover">
      <h2 className="back-cover__title">{backCoverHeading}</h2>
      <ul className="back-cover__list">
        {authors.map((author) => (
          <li className="back-cover__row" key={author.id}>
            <AuthorPhoto author={author} className="back-cover__photo" />
            <div className="back-cover__text">
              <AuthorCaption author={author} />
              <p className="back-cover__takeaway">{author.takeaway}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

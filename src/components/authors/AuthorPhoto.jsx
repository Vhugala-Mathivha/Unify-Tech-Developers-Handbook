import { fullName } from '../../data/authors'
import './authors.css'

export default function AuthorPhoto({ author, className = '' }) {
  return (
    <img
      className={`author-photo ${className}`}
      src={author.photo}
      alt={fullName(author)}
      draggable="false"
    />
  )
}

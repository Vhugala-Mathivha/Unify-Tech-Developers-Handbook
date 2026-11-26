import { fullName } from '../../data/authors'
import './authors.css'

/** Two lines: "Firstname Lastname" then the role. */
export default function AuthorCaption({ author, as: Tag = 'div', className = '' }) {
  return (
    <Tag className={`author-caption ${className}`}>
      <span className="author-caption__name">{fullName(author)}</span>
      <span className="author-caption__role">{author.role}</span>
    </Tag>
  )
}

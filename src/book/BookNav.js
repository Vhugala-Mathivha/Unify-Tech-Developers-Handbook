import { createContext, useContext } from 'react'

/**
 * Lets any page turn the book, e.g. a table-of-contents entry jumping to its
 * chapter. Provided by <Book>.
 *
 * goToPage(n): flip to printed page n.
 */
export const BookNavContext = createContext({ goToPage: () => {} })

export const useBookNav = () => useContext(BookNavContext)

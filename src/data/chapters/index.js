// All chapter spreads, in book order. Add each category's chapters here.
//
// A chapter is either one spread (its fields sit on the chapter itself:
// intro, visual, points, screen, snippets, related) or several, listed in
// `spreads` — each with the same fields plus a `heading`.
import { uiUxChapters } from './uiUx'
import { frontendChapters } from './frontend'
import { backendChapters } from './backend'

export const chapters = [...uiUxChapters, ...frontendChapters, ...backendChapters]

/** The spreads of a chapter, whichever way it was written. */
export const chapterSpreads = (chapter) => chapter.spreads ?? [chapter]

// Role chapters share titles ("Dashboard", "Find a Timetable"), so links name the role too.
const ROLE_GROUPS = ['System Admin', 'Lecturer', 'Student']

/** Chapter label by id (for "See also" links). */
export const chapterTitle = Object.fromEntries(
  chapters.map((c) => [c.id, ROLE_GROUPS.includes(c.group) ? `${c.group}: ${c.title}` : c.title]),
)

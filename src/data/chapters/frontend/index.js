// 02 · Frontend Development — chapters in book order:
// getting started, shared screens, then each role in sidebar order.
import { gettingStartedChapters } from './gettingStarted'
import { sharedScreenChapters } from './sharedScreens'
import { systemAdminChapters } from './systemAdmin'
import { lecturerChapters } from './lecturer'
import { studentChapters } from './student'

export const frontendChapters = [
  ...gettingStartedChapters,
  ...sharedScreenChapters,
  ...systemAdminChapters,
  ...lecturerChapters,
  ...studentChapters,
]

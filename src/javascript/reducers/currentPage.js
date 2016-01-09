import { NEXT_PAGE, PREV_PAGE } from '../actions/actions'

export default function currentPage(state = 0, action) {
  switch (action.type) {
    case NEXT_PAGE:
      return Math.min(state + 1, 5)
    case PREV_PAGE:
      return Math.max(state - 1, 0)
    default:
      return state
  }
}

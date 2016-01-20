import fetch from 'isomorphic-fetch'

export const DISPLAY_NEXT_WEEK = 'DISPLAY_NEXT_WEEK'
export function nextWeek() {
  return {
    type: DISPLAY_NEXT_WEEK
  }
}

export const DISPLAY_PREV_WEEK = 'DISPLAY_PREV_WEEK'

export function prevWeek() {
  return {
    type: DISPLAY_PREV_WEEK
  }
}

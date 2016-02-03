import { SCHEDULE_JOURNAL_SAVE, UNSCHEDULE_JOURNAL_SAVE } from '../actions/journals'
import { CLEAR_DATA, SET_FEELING, SET_BODY, SET_THOUGHTS, SET_SITUATION, SET_REACTION } from '../actions/actions'
import { assign } from 'lodash'

const initialBodyState = {
  head: [],
  left_arm: [],
  right_arm: [],
  chest: [],
  abdomen: [],
  left_leg: [],
  right_leg: [],
  hip: []
}

const initialMoodTrackingState = {
  feeling: { value: 50, color: '' },
  body: initialBodyState,
  thoughts: [],
  situation: [],
  reaction: [],
  scheduledJournalSave: false,
}

export default function homeView(state = initialMoodTrackingState, action) {
  switch (action.type) {
    case SET_FEELING:
      return assign({}, state, {
        feeling: {
          value: action.newValue,
          color: action.color
        }
      })
    case SET_BODY:
      return assign({}, state, {
        body: action.bodyState,
      })
    case SET_THOUGHTS:
      return assign({}, state, {
        thoughts: action.thoughts
      })
    case SET_SITUATION:
      return assign({}, state, {
        situation: action.situation
      })
    case SET_REACTION:
      return assign({}, state, {
        reaction: action.reaction
      })
    case CLEAR_DATA:
      return initialMoodTrackingState
    case SCHEDULE_JOURNAL_SAVE:
      return { scheduledJournalSave: true }
    case UNSCHEDULE_JOURNAL_SAVE:
      return { scheduledJournalSave: false }
    default:
      return state
  }
}

export const SET_FEELING = 'SET_FEELING'

export function setFeeling(object) {
  return {
    type: SET_FEELING,
    newValue: object.value,
    color: object.color
  }
}


export const SET_BODY = 'SET_BODY'

export function setBody(value) {
  return {
    type: SET_BODY,
    bodyState: value
  }
}

export const SET_THOUGHTS = 'SET_THOUGHTS'

export function setThoughts(value) {
  return {
    type: SET_THOUGHTS,
    thoughts: value
  }
}

export const SET_SITUATION = 'SET_SITUATION'

export function setSituation(value) {
  return {
    type: SET_SITUATION,
    situation: value
  }
}

export const SET_REACTION = 'SET_REACTION'

export function setReaction(value) {
  return {
    type: SET_REACTION,
    reaction: value
  }
}

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export function setCurrentPage(value) {
  return {
    type: SET_CURRENT_PAGE,
    newValue: value
  }
}
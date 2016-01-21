import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'

export const weekdays = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']
export const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

export function formatTime(date) {
  if ( date != "") {
    let doubleDigits = function(digit) {
      digit = String(digit)
      if(digit.length<2) {
        digit = "0" + digit
      }
      return digit
    }
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return doubleDigits(hours) + ":" + doubleDigits(minutes)
  }
  else return ""
}

export function formatDay(date) {
  if ( date && date instanceof Date ) {
    let dayName = weekdays[date.getDay()]
    let dayInMonth = date.getDate()
    let monthName = months[date.getMonth()]
    let year = date.getFullYear()

    return dayName + "," + dayInMonth + " " + monthName + " " + year
  }
  else return ""
}

export function mapJournal(journal) {
  let body, thoughts, situation, reaction;

  journal.answers.forEach((answer) => {
    switch(answer.question_id) {
      case bodyQuestionId:
        body = answer.values
      case thoughtsQuestionId:
        thoughts = answer.values
      case situationQuestionId:
        situation = answer.values
      case reactionQuestionId:
        reaction = answer.values
    }
  })
  let mappedJournal = {
    feeling: journal.feeling,
    body: body,
    thoughts: thoughts,
    situation: situation,
    reaction: reaction
  }
  return mappedJournal
}

export function journalSorter(journal_a, journal_b) {
  let date_a = new Date(journal_a.created_at)
  let date_b = new Date(journal_b.created_at)

  if(date_a < date_b) {
    return 1
  } else if(date_a > date_b) {
    return -1
  } else {
    return 0
  }
}

export function reverseArray(input) {
  if (typeof input === 'undefined' || input == null || input.length === 0) {
    return []
  }
  var ret = new Array;
  for(var i = input.length-1; i >= 0; i--) {
      ret.push(input[i]);
  }
  return ret;
}

export function intersperse(arr, sep) {
  if (typeof arr === 'undefined' || arr == null || arr.length === 0) {
      return [];
  }
  return arr.slice(1).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
  }, [arr[0]]);
}

export function prepareJournalData(props) {
  let data = {
    questionnaire_id: defaultQuestionnaireId,
    feeling: props.feeling.value,
    answers: [
      {
        question_id: bodyQuestionId,
        values: props.body
      }, {
        question_id: thoughtsQuestionId,
        values: reverseArray(props.thoughts)
      }, {
        question_id: situationQuestionId,
        values: reverseArray(props.situation)
      }, {
        question_id: reactionQuestionId,
        values: reverseArray(props.reaction)
      }
    ]
  }
  return data
}

//returns color belonging to moodrange 0-100
export function calculateEmotionColor(feeling) {
  if(feeling == 100) {
    return "#92d381"
  } else if (feeling >= 74) {
    return "#c7d476"
  } else if (feeling >= 50) {
    return "#fcd56b"
  } else if (feeling >= 26) {
    return "#f2a26b"
  } else {
    return "#e86e6b"
  }
}




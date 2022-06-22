import * as types from '../actions/types'

const initState = {}
export default function book (state = initState, action) {
  switch (action.type) {
    case types.LOAD_CONTENT:
      return Object.assign({}, state, {
        [action.chapterIndex]: {
          btns: action.btns,
          text: action.text
        }
      })
    case types.STORE_BOOK:
      return Object.assign({}, state, action.data)
    case types.SAVE_BOOK:
      return Object.assign({}, state, action.data)
    case types.REMOVE_BOOK:
      return Object.assign({}, state, {
        isStored: 0,
        isSaved: 0
      })
    default:
      return state
  }
}

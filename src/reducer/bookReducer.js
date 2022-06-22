import * as types from '../actions/types'

const initState = {
  bookName: '',
  url: '',
  bookId: '',
  isStored: 0,
  isSaved: 0,
  read: 0,
  page: 0
}
export default function book (state = initState, action) {
  switch (action.type) {
    case types.LOAD_BOOK:
      return Object.assign({}, state, action.data)
    case types.STORE_BOOK:
      return Object.assign({}, state, action.data)
    case types.SAVE_BOOK:
      return Object.assign({}, state, action.data)
    case types.REMOVE_BOOK:
      return Object.assign({}, state, {
        isStored: 0,
        isSaved: 0
      })
    case types.READ_BOOK:
      return Object.assign({}, state, {
        read: action.read,
        page: action.page
      })
    default:
      return state
  }
}

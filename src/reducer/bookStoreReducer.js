import * as types from '../actions/types'

const initState = {}
export default function bookStore (state = initState, action) {
  switch (action.type) {
    case types.GET_BOOK_STORE:
      return Object.assign({}, state, {data: action.books})
    case types.UPDATE_BOOK_STORE:
      if (state.data && action.updateBook) {
        let books = []
        for (let book of state.data) {
          if (book.bookId === action.updateBook.bookId) {
            books.push(action.updateBook)
          } else {
            books.push(book)
          }
        }
        return {data: books}
      }
      return state
    default:
      return state
  }
}

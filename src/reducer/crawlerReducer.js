import * as types from '../actions/types'

const initState = {

}
export default function crawler (state = initState, action) {
  switch (action.type) {
    case types.GET_CATALOGUE_WITH_CRAWLER:
      return Object.assign({}, state, {
        searchData: action.searchData,
        searchState: action.searchState,
        autoComplete: action.autoComplete
      })
    case types.GET_CATALOGUE_WITH_DS:
      return Object.assign({}, state, {
        catalogue: action.data,
        bookId: action.bookId
      })
    case types.GET_CONTENT_WITH_CRAWLER:
      return Object.assign({}, state)
    default:
      return state
  }
}

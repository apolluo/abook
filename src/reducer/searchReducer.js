import * as types from '../actions/types'

const initialState = {
  hotPart: 0,
  hotWords: [],
  hotWordsPart: [],
  autoComplete: [],
  searchData: [],
  searchState: false
}

export default function search (state = initialState, action) {
  console.log('SEARCH_REDUCER', action, state)
  let books = []
  switch (action.type) {
    case types.SEARCH_SEARCH_BOOKS:
      return Object.assign({}, state, {
        target: action.target || null,
        rule: action.rule,
        searchWord: action.text,
        searchData: action.searchData,
        searchState: action.searchState,
        autoComplete: action.autoComplete
      })
    case types.SEARCH_BOOK_WIDTH_NET:
      action.searchData.forEach(netSearchData => {
        netSearchData.forEach(json => {
          json.searchData.forEach(item => {
            books.push({
              bookName: item.title,
              author: item.author,
              shortIntro: item.desc,
              url: item.directoryUrl,
              resource: json.rule.domain,
              type: 'zhannei'
            })
          })
        })
      })
      return Object.assign({}, state, {
        rule: action.rule,
        searchWord: action.text,
        searchData: books,
        searchRule: types.SEARCH_BOOK_WIDTH_NET,
        searchState: action.searchState,
        autoComplete: action.autoComplete
      })
    case types.SEARCH_BOOK_WITH_ENGINE:
      let list
      if (action.searchData && action.searchData[0] && action.searchData[0].list) {
        list = action.searchData[0].list
      }
      list.forEach(item => {
        books.push({
          bookName: item.title.innerHTML,
          url: item.title.href,
          author: '',
          shortIntro: '',
          resource: 'prophet',
          type: 'engine'
        })
      })
      return Object.assign({}, state, {
        rule: action.rule,
        searchWord: action.text,
        searchData: books,
        searchRule: types.SEARCH_BOOK_WITH_ENGINE,
        searchState: action.searchState,
        autoComplete: action.autoComplete
      })
    default:
      return state
  }
}

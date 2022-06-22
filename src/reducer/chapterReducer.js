import * as types from '../actions/types'

const initState = {
  data: null
}
export default function chapter (state = initState, action) {
  switch (action.type) {
    case types.GET_CATALOGUE_WITH_CRAWLER:
      if (!action.data) return
      let catalogue = []
      action.data.forEach((item, index) => {
        catalogue.push({
          index,
          title: item.title,
          link: item.href,
          cache: 0,
          error: 0
        })
      })
      if (catalogue[action.book.read]) {
        catalogue[action.book.read].isCurrent = 1
      }

      return Object.assign({}, state, {
        data: catalogue
        // ...parseChapterWithPage(catalogue, action.book.read)
      })
    case types.GET_CATALOGUE_WITH_DS:
      if (action.data[action.book.read]) {
        action.data[action.book.read].isCurrent = 1
      }
      let chapters = []
      action.data.forEach((item, index) => {
        chapters.push({
          index,
          ...item
        })
      })
      return Object.assign({}, state, {
        data: chapters
        // ...parseChapterWithPage(action.data, action.book.read)
      })
    // case types.SET_CHAPTER_PAGE:
    //   return Object.assign({}, state, {
    //     ...parseChapterWithPage(state.data, action.page)
    //   })
    default:
      return state
  }
}
// const parseChapterWithPage = (chapters, read = 0) => {
//   let pageSize = 15
//   let total = chapters.length || 0
//   let totalPage = parseInt(total / 15) + 1

//   let currentPage = parseInt(read / pageSize) + 1
//   // let pickerItems = []
//   // let pageChapters = []
//   let getCurrentScope = (index) => ({
//     start: pageSize * index,
//     end: index === (totalPage - 1) ? total : pageSize * (index + 1)
//   })
//   let currentScope = getCurrentScope(currentPage)
//   let currentPageChapters = chapters.slice(currentScope.start, currentScope.end)
//   return {
//     currentPage,
//     currentPageChapters
//   }
// }

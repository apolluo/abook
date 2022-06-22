import * as types from './types'
import api from '../api/search'
import DS from '../api/ds'
import request from '../util/request'
import {getTimeName} from '../util/index'
import storage from '../ds/storage'
export let searchBooks = (text, rule, target) => {
  return dispatch => {
    if (target) {
      return dispatch({
        type: types.SEARCH_SEARCH_BOOKS,
        target,
        text,
        rule,
        searchData: [],
        searchState: true,
        autoComplete: []
      })
    }
    if (rule) {
      if (rule === 'prophet') {
        return api.searchBookListByEngine(text + ' 章节列表').then(data => {
          console.log('prophet', data)
          dispatch(getSearchBooksWithEngine(data, rule, text, target))
        })
      }
      return api.searchBookListWidthNet(text, rule)
        .then((data) => {
          console.log('searchBookListWidthNet', data)
          dispatch(getSearchBooksWidthNet(data, rule, text, target))
        })
    }
    return api.searchBookList(text)
      .then((data) => { data.ok ? dispatch(getSearchBooks(data.books, rule, text, target)) : null })
  }
}
export const getBookStoreAction = () => {
  return dispatch => DS.getBookStore().then(res => {
    console.log('getBookStoreAction res', res)
    dispatch({
      type: types.GET_BOOK_STORE,
      books: res
    })
  })
}
export const loadBookAction = data => {
  return dispatch => dispatch({
    type: types.LOAD_BOOK,
    data: data
  })
}
const updateBook = (book, dispatch) => {
  console.log('updateBook', book)
  return DS.saveBook(book).then(res => {
    dispatch({
      type: types.UPDATE_BOOK_STORE,
      updateBook: book
    })
    return Promise.resolve(res)
  })
}
export const storeBookAction = data => {
  data.isStored = 1
  data.isSaved = 0
  data.read = 0
  data.page = 0
  data.bookId = data.bookId || getTimeName()

  return dispatch => {
    updateBook(data, dispatch).then(res => {
      dispatch({
        type: types.STORE_BOOK,
        data: data
      })
    })
  }
}
export const removeStoreAction = data => {
  return dispatch => {
    DS.removeChapter(data).then(res => {
      console.log('removeChapter res', res)
      return DS.removeBook(data)
    }).then(res => {
      console.log('removeBook res', res)
      dispatch({
        type: types.REMOVE_BOOK,
        data
      })
    })
  }
}

export const getCatalogueAction = ({bookId, bookName, url, isStored, isSaved, read}) => {
  const fetchCatalogueByUrl = (dispatch) => api.getCatalogueByUrl(url).then(data => {
    console.log('getCatalogueByUrl', data)
    return dispatch(getCatalogueWithCrawler(data, {bookId, bookName, url, isStored, isSaved, read}))
  })
  return dispatch => {
    console.log('getCatalogue', bookId, bookName, url, isStored, isSaved, read)
    if (bookId && isSaved) {
      return DS.loadChapter(bookId).then(res => {
        console.log('loadChapter from ds', bookId, res)
        return dispatch(getCatalogueWithDs({bookId, read}, res))
      }).catch(e => {
        console.log('loadChapter from ds error', e)
        return fetchCatalogueByUrl(dispatch)
      })
    } else if (url) {
      return fetchCatalogueByUrl(dispatch)
    }
  }
}
export const saveChapterAction = (chapters, book) => {
  return dispatch => {
    return DS.saveChapter(chapters, book).then(res => {
      console.log('saveChapter ok, then update book isSaved', res)
      book.isSaved = 1
      return updateBook(book, dispatch)
    }).then(res => {
      dispatch({
        type: types.SAVE_BOOK,
        data: book
      })
    })
  }
}
export const readChapterAction = (book) => {
  console.log('readChapterAction', book)
  let saveBook = (book, dispatch) => updateBook(book, dispatch).then(res => dispatch({
    type: types.READ_BOOK,
    read: book.read,
    page: book.page || 0
  }))
  return dispatch => saveBook(book, dispatch)
}
export const setChapterPageAction = page => {
  return dispatch => dispatch({
    type: types.SET_CHAPTER_PAGE,
    page
  })
}
export const loadContentAction = (book, chapters, content, rec) => {
  console.log('loadContentAction', book)
  return dispatch => {
    if (content && content[book.read]) {
      dispatch({
        type: types.READ_BOOK,
        read: book.read,
        page: book.page || 0
      })
      return Promise.resolve({
        type: types.READ_BOOK,
        read: book.read,
        page: book.page || 0
      })
    } else {
      let chapter = chapters[book.read]
      if (!chapter || !chapter.link) return
      dispatch({
        type: types.READ_BOOK,
        read: book.read,
        page: book.page || 0
      })
      let loadContentByLink = (dispatch) => {
        return api.crawlerRecByUrl(chapter.link, rec).then(data => {
          console.log('crawlerRecByUrl', data)
          dispatch({
            type: types.LOAD_CONTENT,
            chapterIndex: book.read,
            btns: data.btns,
            text: data.text
          })
          DS.saveContent({bookId: book.bookId, chapterIndex: book.read, text: data.text, btns: data.btns})
            .then(res => {
              chapter.cache = 1
              console.log('chapters', chapters)
              saveChapterAction(chapters, book)(dispatch)
            }).catch(err => {
              console.log('error', err)
            })
        })
      }
      if (chapter.cache) {
        return DS.readContent({bookId: book.bookId, chapterIndex: book.read}).then(res => {
          console.log('read content from ds', res)
          return dispatch({
            type: types.LOAD_CONTENT,
            chapterIndex: book.read,
            text: res.text
          })
        })
      }
      return loadContentByLink(dispatch)
    }
  }
}

let getRecWithCrawler = (data, rec) => {
  console.log('action getRecWithCrawler', rec)
  switch (rec) {
    case 'content':
      return {
        type: types.GET_CONTENT_WITH_CRAWLER,
        chapter: {
          btns: data.btns,
          body: data.text
        },
        searchState: true,
        autoComplete: []
      }
  }
}
let getSearchBooks = (books, rule, text, target) => {
  return {
    type: types.SEARCH_SEARCH_BOOKS,
    rule,
    text,
    target,
    searchData: books,
    searchState: true,
    autoComplete: []
  }
}
let getSearchBooksWidthNet = (data, rule, text, target) => {
  if (data && data[0]) {
    return {
      type: types.SEARCH_BOOK_WIDTH_NET,
      rule,
      text,
      target,
      searchData: data,
      searchState: true,
      autoComplete: []
    }
  }
  return {
    type: types.SEARCH_BOOK_WIDTH_NET,
    rule,
    text,
    target,
    searchData: null,
    searchRule: null,
    searchState: true,
    autoComplete: []
  }
}
let getSearchBooksWithEngine = (data, rule, text, target) => {
  if (data && data[0] && data[0].list) {
    return {
      type: types.SEARCH_BOOK_WITH_ENGINE,
      rule,
      text,
      target,
      searchData: data,
      searchState: true,
      autoComplete: []
    }
  }
  return {
    type: types.SEARCH_BOOK_WITH_ENGINE,
    rule,
    text,
    target,
    searchData: null,
    searchRule: null,
    searchState: true,
    autoComplete: []
  }
}
let getCatalogueWithDs = (book, data) => {
  return {
    type: types.GET_CATALOGUE_WITH_DS,
    data,
    book
  }
}
let getCatalogueWithCrawler = (data, book) => {
  return {
    type: types.GET_CATALOGUE_WITH_CRAWLER,
    data,
    book
  }
}
// let getCatalogueWithCrawler = (data) => {
//   if (!data) return
//   let catalogue = []
//   data.forEach(item => {
//     catalogue.push({
//       title: item.title,
//       link: item.href
//     })
//   })
//   return {
//     type: types.GET_CATALOGUE_WITH_CRAWLER,
//     mixToc: {
//       chapters: catalogue
//     },
//     searchState: true
//   }
// }

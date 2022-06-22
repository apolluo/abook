import request from '../util/request'
import api from '../config/zhuishu/api'
// import Parser from '../parser/Parser'
import Master from '../parser/Master'
// const API_ENGINE_CRAWL = `http://9.134.2.47:8081/crawl/source`
const API_ENGINE_CRAWL = `http://139.155.53.64:8081/crawl`
const searchBookListByEngine = (search, key = 'wd', sid = '5d8493bf77a69f2239d03e46') => {
  return request.get(`${API_ENGINE_CRAWL}/source?key=${key}&sid=${sid}&search=${search}`)
}
const searchBookList = function (text, callback) {
  return request.get(api.SEARCH_BOOKS, {
    query: text
  }
    //   ,
    //   (data) => {
    //     callback(data)
    //     // return data
    //     // data.ok ? dispatch(getSearchBooks(data.books)) : null
    //   }
  )
}
const searchBookListWidthNet = function (text, rule) {
  // let parser = new Parser(rule)
  // // console.log('searchBookListWidthNet', parser.search(text))
  // return parser.search(text)
  let master = new Master()
  return master.search(text, rule)
}
const searchBookMenu = function () {
  return request.get(api.DISCOVER_BOOK_LIST)
}
// 书籍详情
const getBookDetail = (bookId, url) => {
  if (bookId) {
    return request.get(api.API_BASE_URL + '/book/' + bookId)
  }
  return null
}
// 通过爬虫获取书籍目录
const getCatalogueByUrl = url => {
  return request.get(`${API_ENGINE_CRAWL}?rec=numlist&url=${url}`)
}
const crawlerRecByUrl = (url, rec) => {
  return request.get(`${API_ENGINE_CRAWL}?rec=${rec}&url=${url}`)
}
// GET 获取书的章节信息 http://api.zhuishushenqi.com/mix-atoc/5569ba444127a49f1fa99d29?view=chapters
const getChapterList = bookId => {
  return request.get(api.API_BASE_URL + '/mix-atoc/' + bookId + '?view=chapters')
}
// GET 获取书的章节详情
const getChapterDetail = url => {
  let newUrl = 'http://chapter2.zhuishushenqi.com/chapter/' + url.replace(/\//g, '%2F').replace('?', '%3F')
  console.log('newUrl', newUrl)
  return request.get(newUrl)
}

export default {
  crawlerRecByUrl,
  getCatalogueByUrl,
  searchBookListByEngine,
  searchBookList,
  searchBookMenu,
  getBookDetail,
  getChapterList,
  getChapterDetail,
  searchBookListWidthNet
}

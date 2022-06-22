import storage from '../ds/storage'
const DS = {
  getBookStore: () => storage.getAllDataForKey('store')
    .then(books => {
      console.log('getBookStore', books)
      return Promise.resolve(books)
    }).catch(e => {
      console.log(e)
    }),

  saveBook: data => storage.save({
    key: 'store',
    id: data.bookId,
    data: data,
    expires: null
  }).then(res => {
    console.log('save book', data)
    // this.saveChapter(data['_id'])
    // console.log(res)
  }).catch(err => {
    console.log('save book error', err)
  }),
  removeBook: data => {
    console.log('remove book', data)
    return storage.remove({
      key: 'store',
      id: data.bookId
    }).then(res => {
      console.log('removeStore', res)
    }).catch(err => {
      console.log('remove book error', err)
    })
  },
  loadChapter: bookId => storage.load({
    key: 'chapter',
    id: bookId
  }),
  saveChapter: (chapters, book) => {
    console.log('saveChapter', chapters, book)
    return storage.save({
      key: 'chapter',
      id: book.bookId,
      data: chapters
    }).then(res => {
      console.log('save', chapters, book)
    }).catch(e => console.log(e))
  },
  removeChapter: data => {
    return storage.remove({
      key: 'chapter',
      id: data.bookId
    }).then(res => {
      console.log('removeChapter', res)
      return true
    }).catch(err => {
      console.log('removeChapter error', err)
      return false
    })
  },
  saveContent: data => {
    return storage.save({
      key: `co${data.bookId}`,
      id: data.chapterIndex,
      data: data.text
    //   btns: data.btns
    }).then(res => {
      console.log('save content', data.bookId, data.chapterIndex)
      return Promise.resolve({
        type: 'ok',
        bookId: data.bookId,
        chapterIndex: data.chapterIndex
      })
    }).catch(err => {
      console.log('save content error', data.bookId, data.chapterIndex, err)
      return Promise.reject(err)
    })
  },
  readContent: data => {
    return storage.load({
      key: `co${data.bookId}`,
      id: data.chapterIndex
    }).then(res => {
      console.log('readContent', data.bookId, data.chapterIndex, res)
      return Promise.resolve({
        type: 'ok',
        bookId: data.bookId,
        chapterIndex: data.chapterIndex,
        text: res
        // btns: res.btns
      })
    }).catch(err => {
      console.log('readContent error', data.bookId, data.chapterIndex, err)
      return Promise.reject(err)
    })
  }
}
export default DS

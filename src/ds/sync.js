import storage from './storage'
import { getBookDetail, getChapterList, getChapterDetail } from '../api/search'
storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 参数从params中解构取出
  // 最后返回所需数据或一个promise
  async store (params) {
    const {
      id,
      syncParams: { extraFetchOptions, someFlag }
    } = params
    const data = await getBookDetail(id)
    console.log('sync book', params, id, data)
    if (data && data['_id']) {
      storage.save({
        key: 'store',
        id: data['_id'],
        data: data
      })
      return data
    } else {
      // 出错时抛出异常
      throw new Error(`don't search that book`)
    }
  }
}
export default storage.sync

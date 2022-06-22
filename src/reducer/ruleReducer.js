import * as types from '../actions/types'
import rules from '../config/rules'
const initialState = {
  domain: `www.geilwx.com`,
  encode: 'gbk',
  // 工作在搜索引擎提取的url中
  directoryUrlRegexp: /^\/GeiLi\/\d+\/\d+\/$/,
  // 工作在搜索引擎提取页面
  titleRule: /.*(?=最新章节)/,
  // 工作在列表页面
  authorRule: $ => $('body > div.TabCss > dl > p').text().replace(/写的小说.*$/, '').replace('作者：', ''),
  // 工作在列表页面,返回一个a标签
  articleLinkRule: $ => $('body > div.TabCss > dl > dd > a'),
  // 工作在文章页面
  articleContentRule: $ => {
    $('script,div,h1').replaceWith('')
    $('br').replaceWith('\r\n')

    return $('body').text().replace('readx();&nbsp;&nbsp;&nbsp;&nbsp;', '').trim()
  }
}

export default (state = initialState, action) => {
  console.log('GET_RULE', action, state)
  switch (action.type) {
    case types.GET_RULE:
      return action.data
    default:
      return state
  }
}

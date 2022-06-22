// zhannei.baidu.com
import parse from 'url-parse'
import baidu from './baidu'
import zhannei from './zhannei'
import * as types from '../actions/types'

const rules = [{
  type: types.API_PROPHET,
  label: '先知',
  rules: 'prophet'
}, {
  type: types.NET_ZHAN_NEI,
  label: '小说站点',
  rules: zhannei
}, {
  type: types.NET_BAI_DU,
  label: '百度',
  rules: baidu
}, {
  type: types.API_ZHUI_SHU,
  label: '追书神器',
  rules: null
}]

export default rules

function replaceBR (html) {
  html.replace(/<br>/)
}
function getRuleByUrl (url) {
  let urlObject = parse(url)
  let domain = urlObject.hostname
  for (var rule of rules[0]) {
    if (rule.domain == domain) {
      return rule
    }
  }
  return null
}
export { getRuleByUrl }

/*
 * description: 网络请求工具类
 */

'use strict'

import queryString from 'query-string'
// import config from '../common/config'

var request = {}

request.get = (url, params, successCallBack, failCallBack) => {
  if (params) {
    url += '?' + queryString.stringify(params)
  }
  console.log('httpUtil -- GET -- URL : ' + url)
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Connection': 'close',
      'type': 'getUserData'
    }})
    .then((response) => response.json())
    // .then((response) => {
    //   console.log(response)
    //   successCallBack(response)
    // })
    .catch((error) => {
      console.log(error)
      // failCallback(error)
    })
}

// request.post = (url, body, successCallBack, failCallBack) => {
//   var options = Object.assign(config.header, {
//     body: JSON.stringify(body)
//   })
//   console.log('httpUtil -- POST -- URL : ' + url + ' -- BODY : ' + body)
//   return fetch(url, options)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response)
//       successCallBack(response)
//     })
//     .catch((error) => {
//       console.log(response)
//       failCallback(error)
//     })
// }
export default request

const getURL = function (urlStr) {
  if (!urlStr) return ''
  let url = urlStr.match(/http.+/)
  if (url) {
    return decodeURIComponent(url[0])
  }
  return urlStr
}
export {
  getURL
}

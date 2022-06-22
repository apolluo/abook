import { Dimensions } from 'react-native'

let window = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
let contentFormat = (content) => {
  content = '\u3000\u3000' + content.replace(/\n/g, '@\u3000\u3000')
  let fontCount = parseInt(window.width / 18 - 1)
  let fontLines = parseInt((window.height - 100) / 34)
  console.log('font', fontCount, fontLines)
  const length = content.length
  let array = []
  let x = 0, y, m = 0
  while (x < length) {
    let _array = []
    for (var i = 0; i < fontLines; i++) {
      let str = content.substring(x, x + fontCount)
      if (str.indexOf('@') != -1) {
        y = x + str.indexOf('@') + 1
        _array[i] = {key: i, content: content.substring(x, y).replace('@', '')}
        x = y
        continue
      } else {
        y = x + fontCount
        _array[i] = {key: i, content: content.substring(x, y)}
        x = y
        continue
      }
    }
    array[m] = _array
    m++
  }
  return array
}
export {
  window,
  contentFormat
}

const cover = (num) => num < 10 ? '0' + num : num
const getTimeName = () => {
  let d = new Date()
  return '' + d.getFullYear() + cover(d.getMonth()) + cover(d.getDate()) + cover(d.getHours()) + cover(d.getMinutes()) + cover(d.getSeconds()) + d.getMilliseconds()
}
export {
  getTimeName
}

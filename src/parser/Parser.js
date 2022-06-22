// @flow
/*
http://zhannei.baidu.com/cse/site?q=%E4%B8%80%E4%B8%96&cc=www.23wx.com
*/
import crawler from './crawler'
// import type cheerio from 'cheerio'

/*
event type newNovelFound
 */
export default class Parser {
  rule;
  novelsUrl = [];
  constructor (rule) {
    this.rule = rule
  }

  /**
   * 取消任务
   */
  cancel () {

  }
  /**
   * 根据关键词搜索书
   * @param  {string} keywords 用户输入的关键词,可能是书名,作者,或者其他
   * @return Promise ,标识是否成功结束
   */
  search (keywords, callback) {
    // let url = `http://zhannei.baidu.com/cse/site?q=${encodeURIComponent(keywords)}&cc=${this.rule.domain}`
    let url = this.rule.searchApi(encodeURIComponent(keywords))
    // 最多多少页
    let max = 1
    let jobs = []
    for (let i = 0; i < max; i++) {
      jobs.push(crawler(url + '&p=' + i, this.rule).then(($) => {
        // this.getNovelsUrl($, (max - i) * 100, callback)
        let searchData = this.getNovelsUrl($, (max - i) * 100)
        return Promise.resolve(searchData)
      }))
    }

    return Promise.all(jobs)
  }
  extractByRule ($, score, extractRule) {
    let resultArr = $(extractRule.result)
    console.log('resultArr', resultArr)
    let perRankScore = Math.floor(99.0 / resultArr.length)
    let extractResult = []
    resultArr.each((i, cheerioResult) => {
      let extractOne = {
        isParseDirectory: false,
        // logo: '',
        author: '',
        directory: [],
        score: score + (resultArr.length - i) * perRankScore
      }
      Object.keys(extractRule).forEach(key => {
        if (key === 'result') {
          extractOne[key] = cheerioResult
        } else {
          let parseArr = extractRule[key].split('|')
          let selector = parseArr[0]
          let fun = parseArr[1]
          extractOne[key] = $(selector, cheerioResult)
          if (fun) {
            extractOne[key] = extractOne[key].attr(fun)
          } else {
            extractOne[key] = extractOne[key].text()
          }
        }
        extractResult.push(extractOne)
      })
    })
    return extractResult
  }
  getNovelsUrl ($, score, callback) {
    console.log(this.rule.extractRule)
    let res = this.extractByRule($, score, this.rule.extractRule)
    console.log('res', res)

    // let links = $('#results .c-title a')
    // let perRankScore = Math.floor(99.0 / links.length)
    let rule = this.rule
    // let res = []
    // links.each((i, link) => {
    //   // 取href 的domain后的url
    //   let cleanUrlRule = new RegExp(`^https?://${this.rule.domain.replace('.', '\\.')}`)
    //   let directoryUrl = $(link).attr('href')

    //   if (this.novelsUrl.indexOf(directoryUrl) == -1) {
    //     let ruleWantMath = directoryUrl.replace(cleanUrlRule, '')

    //     if (this.rule.directoryUrlRegexp.test(ruleWantMath)) {
    //       this.novelsUrl.push(directoryUrl)

    //       let title = $(link).text()
    //       let match = title.match(this.rule.titleRule)
    //       if (match) {
    //         title = match[0]
    //       }

    //       let desc = $(link).parents('.result').find('.c-abstract').text().replace(/\n/g, '').trim()

    //       let novel = {
    //         title,
    //         directoryUrl,
    //         desc,
    //         isParseDirectory: false,
    //         logo: '',
    //         author: '',
    //         directory: [],
    //         score: score + (links.length - i) * perRankScore

    //       }
    //       res.push(novel)
    //       // callback(novel, rule)
    //     }
    //   }
    // })
    return {
      rule,
      searchData: res
    }
  }
}

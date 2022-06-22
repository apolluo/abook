// @flow
import Parser from './Parser'
// import rules from '../rules'

export default class Master {
  parsers ;

  search (keywords, rules) {
    this.parsers = []
    let jobs = []
    for (let rule of rules) {
      let parser = new Parser(rule)
      this.parsers.push(parser)
      jobs.push(parser.search(keywords))
    }

    return Promise.all(jobs)
  }

  cancel () {
    for (let parser of this.parsers) {
      parser.cancel()
    }
  }
}

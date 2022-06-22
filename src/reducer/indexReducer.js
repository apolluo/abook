import {combineReducers} from 'redux'
import search from './searchReducer'
import rule from './ruleReducer'
import resource from './resourcesReducer'
import bookStore from './bookStoreReducer'
import chapter from './chapterReducer'
import book from './bookReducer'
import content from './contentReducer'

const indexReducer = combineReducers({
  resource,
  rule,
  search,
  bookStore,
  book,
  chapter,
  content
})

export default indexReducer

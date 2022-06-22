import React from 'react'
import Search from '../../../base/Search'
import BookList from './BookList'
import {View, Image} from 'react-native'
import storage from '../../../../ds/storage'
import { connect } from 'react-redux'

import {searchBooks, getBookStoreAction} from '../../../../actions/searchAction'
// import sync from '../../../../ds/sync'
class Home extends React.Component {
  // static propTypes = {
  //   bookList: PropTypes.bool.isRequired
  // }
  constructor (props) {
    super(props)
    console.log('main home', this.props)
    this.state = {
      data: null
    }
    // this.showSearchBook = (data) => {
    //   // console.log('get books', data)
    //   this.setState({
    //     data
    //   })
    // }
    // this.getBookStore()
  }
  componentDidMount () {
    this.props.getBookStore()
  }
  // componentWillReceiveProps (newProps) {
  //   console.log('componentWillReceiveProps bookList', newProps.bookList, this.props.bookList)
  // }
  // getBookStore () {
  //   // storage.clearMap()
  //   // storage.clearMapForKey('store')
  //   storage.getIdsForKey('store').then(ids => {
  //     console.log('books id', ids)
  //   }).catch(e => {
  //     console.log('books id error', e)
  //   })
  //   storage.getAllDataForKey('store')
  //     .then(books => {
  //       console.log('getBookStore', books)
  //       if (books) {
  //         this.setState({
  //           data: {
  //           // books: [{
  //           //   aliases: '',
  //           //   allowMonthly: true,
  //           //   author: '卡列颠尼亚',
  //           //   banned: 0,
  //           //   cat: '都市',
  //           //   contentType: 'txt',
  //           //   cover: '/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2180486%2F2180486_0ab5b4300af84521b5c8409329327b49.jpg%2F',
  //           //   hasCp: true,
  //           //   highlight: '',
  //           //   lastChapter: '最终卷　天人合一 后记与彩蛋',
  //           //   latelyFollower: 822,
  //           //   retentionRatio: 30.53,
  //           //   shortIntro: '昔有马良，画物为真。今有浦杰，创号成人。↵滚滚红尘，几欲化神。芸芸佳人，一世情深。',
  //           //   site: 'zhuishuvip',
  //           //   sizetype: -1,
  //           //   superscript: '',
  //           //   title: '精分写手成神记',
  //           //   wordCount: 3459639,
  //           //   _id: '5a0d2efb8ed14d8167d6463e'
  //           // }]
  //             books
  //           }
  //         })
  //       }
  //     }).catch(e => {
  //       console.log(e)
  //     })
  // }
  // onChange (value) {
  //   this.setState({ value })
  // }
  // componentWillReceiveProps (nextProps) {
  //   console.log('componentWillReceiveProps', this.props, nextProps)
  //   if (nextProps.searchTarget) {
  //     this.props.navigation.navigate('SearchBooks', {
  //       searchRule: nextProps.rule,
  //       bookName: nextProps.bookName
  //     })
  //   }
  // }
  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('shouldComponentUpdate')
  //   console.log(this.props, this.state)
  //   console.log(nextProps, nextState)
  // }
  render () {
    console.log('render home', this.props.bookList)
    if (!this.props.bookList) return null
    // let bookList = Array.from(this.props.bookList)
    // bookList.forEach(book => {
    //   if (book.bookId === this.props.readBook.bookId) {
    //     book = this.props.readBook
    //   }
    // })
    return <View style={{flex: 1}}>
      <View style={{flex: 1}}><Search target='blank' {...this.props}></Search></View>
      <View style={{position: 'absolute', top: 100, width: '100%', height: 600}}>
        {/* <BookList dataSource={this.state.data} isStored={1} {...this.props} ></BookList> */}
        <BookList dataSource={this.props.bookList} isStored={1} {...this.props} ></BookList>
      </View>

    </View>
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    bookList: state.bookStore.data
    // readBook: state.book
    // searchTarget: state.search.target,
    // bookName: state.search.searchWord,
    // rule: state.search.rule
  }
}

const mapDispathToProps = (dispatch, ownProps) => ({
  getBookStore: () => dispatch(getBookStoreAction())
  // search: query => dispatch(searchBooks(query))
})
export default connect(mapStateToProps, mapDispathToProps)(Home)

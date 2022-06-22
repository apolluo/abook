import React from 'react'
import { Image, ScrollView, View, Text } from 'react-native'
import {
  List,
  Button,
  ActivityIndicator,
  WingBlank
} from '@ant-design/react-native'
import { getBookDetail, getChapterList, getChapterDetail } from '../../../api/search'
import { getURL } from '../../../config/zhuishu/dataParse'
import storage from '../../../ds/storage'
import { connect } from 'react-redux'
import {getTimeName} from '../../../util/index'
import ScreenHoc from '../../base/ScreenHoc'
import { loadBookAction, storeBookAction, removeStoreAction } from '../../../actions/searchAction'
const Item = List.Item
const Brief = Item.Brief
class Book extends React.Component {
  constructor (props) {
    console.log('screen book')
    super(props)

    // const {navigation} = this.props
    // const bookId = navigation.getParam('bookId')
    // const bookName = navigation.getParam('bookName')
    // const url = navigation.getParam('url')
    // const isSaved = navigation.getParam('isSaved')
    // const isStored = navigation.getParam('isStored')
    // const read = navigation.getParam('read')
    this.state = {
      page: 'book',
      data: {
        ...this.props.params
        // bookName,
        // url,
        // bookId,
        // isStored,
        // isSaved,
        // read
      }

    }
  }
  componentDidMount () {
    this.props.loadBook(this.state.data)
    // this.showBook(this.state.data)
  }
  // showBook (book) {
  //   console.log('showBook', book)
  //   // zhuishu
  //   if (!book.url) {
  //     /** TODO
  //      * 将追书数据及搜索引擎数据存到服务器，合并为一个接口
  //      */
  //     getBookDetail(book.bookId).then(data => {
  //     // console.log('book', data)
  //       this.setState({
  //         data: {
  //           data,
  //           ...book
  //         }
  //       })
  //     })
  //   } else {
  //     book.bookId = book.bookId || getTimeName()
  //     this.setState({
  //       data: {
  //         ...book
  //       }
  //     })
  //   }
  // }
  // addToStore (data) {
  //   data.isStored = 1
  //   data.isSaved = 0
  //   data.read = 0
  //   if (!data.bookId) {
  //     data.bookId = this.state.bookId
  //   }
  // console.log('addToStore', data)
  // storage.load({
  //   key: 'store',
  //   id: data['_id']
  // }).then(res => {
  //   if (!res) {
  //     console.log('save book in store', res)
  //     storage.save({
  //       key: 'store',
  //       id: data['_id'],
  //       data: data,
  //       expires: null
  //     }).then(res => {
  //       console.log('save', res)
  //       console.log(res)
  //     })
  //   } else {
  //     console.log('book has in store', res)
  //   }
  // }).catch(err => {
  //   console.log('err', err)
  //   storage.save({
  //     key: 'store',
  //     id: data['_id'],
  //     data: data,
  //     expires: null
  //   }).then(res => {
  //     console.log('save', res)
  //     console.log(res)
  //   })
  // })
  // storage.save({
  //   key: 'store',
  //   id: data.bookId,
  //   data: data,
  //   expires: null
  // }).then(res => {
  //   console.log('save book', data)
  //   // this.saveChapter(data['_id'])
  //   // console.log(res)
  // }).catch(err => {
  //   console.log('save book error', err)
  // })
  // }
  // removeStore () {
  //   console.log('remove book', this.state.bookId)
  //   storage.remove({
  //     key: 'store',
  //     id: this.state.bookId
  //   }).then(res => {
  //     console.log('removeStore', res)
  //   }).catch(err => {
  //     console.log('remove book error', err)
  //   })
  // }

  gotoChapter () {
    console.log('gotoChapter', this.props.book)
    this.props.navigation.navigate('Chapter', {
      ...this.props.book
    })
  }
  render () {
    if (!this.props.book) {
      return (<ActivityIndicator
        animating={this.state.animating}
        toast
        size="large"
        text="Loading..."
      />)
    }
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{flexDirection: 'column'}}>
          <Image source={{uri: getURL(this.props.book.cover)}} style={{width: 90, height: 120}}/>
          <View>
            <Text>{this.props.book.title}</Text>
            <Text>{this.props.book.author}</Text>
            <Text>{this.props.book.wordCount}</Text>
          </View>
        </View>
        <Text>{this.props.book.longIntro}</Text>
        <WingBlank
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {this.props.book.isStored ? <Button type="ghost" onPress={() => this.props.removeStore(this.props.book)}>取消收藏</Button> : <Button type="ghost" onPress={() => this.props.storeBook(this.props.book)}>收藏</Button>}

          <Button type="ghost" onPress={() => this.gotoChapter()}>开始阅读</Button>
          <Button type="ghost" >下载</Button>
        </WingBlank>
      </ScrollView>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  crurrentBook: state.crurrentBook
})
const mapDispatchToProps = (dispatch) => ({
  loadBook: data => dispatch(loadBookAction(data)),
  storeBook: data => dispatch(storeBookAction(data)),
  removeStore: data => dispatch(removeStoreAction(data))
})
const BookScreen = ScreenHoc(Book)
export default connect(mapStateToProps, mapDispatchToProps)(BookScreen)

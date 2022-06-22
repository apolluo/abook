import React from 'react'
import { Image, ScrollView, View, Text } from 'react-native'
import {
  List,
  Flex,
  ActivityIndicator,
  WingBlank
} from '@ant-design/react-native'
import { getURL } from '../../../../config/zhuishu/dataParse'
import { getChapterList, getChapterDetail } from '../../../../api/search'
import HtmlHoc from '../../../base/HtmlHoc'
import { loadBookAction, storeBookAction, removeStoreAction } from '../../../../actions/searchAction'
import { connect } from 'react-redux'
const Item = List.Item
const Brief = Item.Brief
class BookList extends React.Component {
  constructor (props) {
    super(props)
    // console.log('main booklist', this.props)
    this.state = {
      page: 'list'
    }
  }
  gotoBook (bookData) {
    bookData.bookName = bookData.bookName.replace(/<em>|<\/em>/g, '')
    bookData.isStored = this.props.isStored
    console.log('gotoBook', bookData)
    this.props.loadBook(bookData)
    if (bookData.read || bookData.page) {
      this.props.navigation.navigate('Content', {
        read: bookData.read,
        page: bookData.page
      })
    } else {
      this.props.navigation.navigate('Book', {
        ...bookData
      })
    }
  }

  render () {
    // console.log('render booklist', this.props.dataSource.books)
    if (this.state.page == 'list') {
      if (!this.props.dataSource || !this.props.dataSource.length) {
        return null
      }
      const HtmlText = HtmlHoc(Text)
      let boosList = []
      this.props.dataSource.forEach((item, index) => {
        boosList.push(
          <Item style={{alignItems: 'center'}} key={index} wrap onPress={() => this.gotoBook(item)}>
            <HtmlText key={`title-${index}`} style={{fontSize: 16}}>{item.bookName}</HtmlText>
            <View style={{flexDirection: 'row'}} >
              <Image source={item.cover ? {uri: getURL(item.cover)} : require('@src/res/cover.jpg') } style={{width: 90, height: 120}}/>
              <WingBlank size="sm" style={{width: '75%'}}>
                <Text ellipsizeMode="tail" numberOfLines={8}>
                  {item.shortIntro}
                </Text>
              </WingBlank>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {item.author ? <Text>作者：{item.author}</Text> : null}
              {item.resource ? <Text style={{color: '#ccc'}}>来源：{item.resource}</Text> : null}
            </View>
          </Item>
        )
      })
      // return <Text>{boosList.length}</Text>
      console.log('boosList', boosList.length)
      return (
        <ScrollView style={{flex: 1, backgroundColor: '#f5f5f9'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <List renderHeader={'书单'}>{boosList}</List>
        </ScrollView>
      )
    }
  }
}
const mapStateToProps = (state, ownProps) => ({
  // book: state.book
})
const mapDispatchToProps = (dispatch) => ({
  loadBook: data => dispatch(loadBookAction(data)),
  storeBook: data => dispatch(storeBookAction(data)),
  removeStore: data => dispatch(removeStoreAction(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(BookList)

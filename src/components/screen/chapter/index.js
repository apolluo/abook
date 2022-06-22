import React from 'react'
import { StyleSheet, ScrollView, View, Text, ListView, TouchableOpacity, FlatList, Picker, Button} from 'react-native'
import {
  List,
  Flex,
  ActivityIndicator,
  WingBlank
} from '@ant-design/react-native'
import { getChapterList, getChapterDetail } from '../../../api/search'
import {loadChapterAction, getCatalogueAction, saveChapterAction, readChapterAction, setChapterPageAction} from '../../../actions/searchAction'
import storage from '../../../ds/storage'
import { connect } from 'react-redux'
import ScreenHoc from '../../base/ScreenHoc'
const Item = List.Item
const Brief = Item.Brief
class Chapter extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: `${navigation.getParam('title')}`,
  //   // header: navigation.getParam('visible') ? <Text>{navigation.getParam('title')}</Text> : null
  //   headerLeft: <Button title='上一页'></Button>,
  //   headerRight: <Button title='下一页'></Button>
  // });
  constructor (props) {
    super(props)
    // const {navigation,chapters} = this.props
    // const bookId = navigation.getParam('bookId')
    // const bookName = navigation.getParam('bookName')
    // const url = navigation.getParam('url')
    // const isSaved = navigation.getParam('isSaved')
    // const isStored = navigation.getParam('isStored')
    // const read = navigation.getParam('read')

    this.state = {
      page: 'chapter',
      load: {
        ...this.props.params
        // bookId,
        // bookName,
        // url,
        // read,
        // isSaved,
        // isStored
      },
      chapters: null,
      currentScope: null,
      currentPage: 1,
      pageSize: 15
    }
    console.log('screen chapter', this.state, this.props)
    // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }
  componentDidMount () {
    console.log('chapter mount', this.props)
    if (this.state.load.bookId && this.state.load.bookId === this.props.book.bookId && this.props.chapters) {
      this.setChapters(this.props)
      console.log('load from store', this.props)
    } else {
      this.fetchChapters(this.state.load)
    }
  }
  componentWillReceiveProps (newProps) {
    console.log('componentWillReceiveProps', newProps.chapters, this.props.chapters,
      newProps.navigation.getParam('currentPage'), this.props.navigation.getParam('currentPage'), this.state.currentScope, this.state.currentPage)
    if (newProps.chapters !== this.props.chapters) {
      this.setChapters(newProps)
    }
    let newPage = newProps.navigation.getParam('currentPage')
    if (newPage !== this.state.currentPage) {
      this.setPage(newPage)
    }
  }
  onLayout (e) {
    console.log('onLayout', this.catalogue, this.props.book.read)
    if (this.catalogue) {
      // this.catalogue.scrollToIndex({ viewPosition: 0, index: parseInt(this.props.book.read) })
      // let getScrollResponder = this.catalogue.getScrollResponder()
      // console.log('getScrollResponder', getScrollResponder)
      // getScrollResponder.scrollTo({ y: 64 * parseInt(this.props.book.read), animated: true })
    }
  }
  fetchChapters = ({bookId, bookName, url, isStored, isSaved, read}) => {
    console.log('fetchChapters', bookId, bookName, url)
    this.props.getCatalogue({bookId, bookName, url, isStored, isSaved, read})
  }
  setChapters (props) {
    const pageChapterObj = parseChapterWithPage(props.chapters, props.book.read)
    this.setState({
      currentPage: pageChapterObj.currentPage,
      currentScope: pageChapterObj.currentScope,
      totalPage: pageChapterObj.totalPage
    })
    this.props.navigation.setParams({
      currentPage: pageChapterObj.currentPage,
      pickerItems: pageChapterObj.pickerItems
    })
    console.log('setParams', this.props.navigation)
    // if (this.catalogue) {
    //   console.log('setChapters', this.catalogue, this.props.book.read)
    //   // this.catalogue.scrollToIndex({ viewPosition: 0, index: parseInt(this.props.book.read) })
    //   // this.catalogue.getScrollResponder().scrollTo({ y: 64 * parseInt(this.props.book.read), animated: true })
    // }
    if (props.book.isStored && !props.book.isSaved) {
      this.props.saveChapter(props.chapters, props.book)
    }
  }
  setPage (page) {
    this.setState({
      currentPage: page,
      currentScope: getCurrentScope(page, this.state.pageSize, this.state.totalPage, this.props.chapters.length)
    })
  }
  gotoContent=(read, page) => {
    console.log('gotoContent', read, page)
    let book = Object.assign({}, this.props.book, {read, page})
    this.props.readChapter(book).then(res => {
      console.log('then', res, book)
      this.props.navigation.navigate('Content', {
        read, page
      })
    })
  }
  renderItem ({item, index}) {
    console.log('renderItem', item.isCurrent)
    return (
      <TouchableOpacity key={index} onPress={() => this.gotoContent(item.index, 0)}>
        <Text style={[styles.listItem, item.isCurrent ? styles.currentChapter : {}]}>{item.title}</Text>
      </TouchableOpacity>)
  }
  render () {
    console.log('render chapter', this.props.chapters, this.state.currentScope)
    if (!this.props.chapters || !this.state.currentScope) {
      return (<ActivityIndicator
        // animating={this.state.animating}
        toast
        size="large"
        text="Loading..."
      />)
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.chapters.slice(this.state.currentScope.start, this.state.currentScope.end)}
          // data={this.props.currentPageChapters}
          ref={(ref) => this.catalogue = ref}
          renderItem={this.renderItem.bind(this)}
          initialNumToRender={15}
          keyExtractor={(item, index) => `${index}`}
          getItemLayout={(data, index) => ({ length: 64, offset: 64 * index, index })}
          onLayout={this.onLayout.bind(this)}
        // scrollEnabled={false}
        // onScroll={this.onScroll}
        />

      </View>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    // currentPage: state.chapter.currentPage,
    // currentPageChapters: state.chapter.currentPageChapters,
    chapters: state.chapter.data,
    book: {...state.book}
  }
}
const mapDispatchToProps = (dispatch) => ({
  // loadChapter: bookId => dispatch(loadChapterAction(bookId)),
  getCatalogue: (params) => dispatch(getCatalogueAction(params)),
  saveChapter: (chapters, book) => dispatch(saveChapterAction(chapters, book)),
  readChapter: book => dispatch(readChapterAction(book))
  // setPage: currentPage => dispatch(setChapterPageAction(currentPage))
})
let getCurrentScope = (page, pageSize, totalPage, total) => ({
  start: pageSize * (page - 1),
  end: page === totalPage ? total : pageSize * page
})
const parseChapterWithPage = (chapters, read = 0) => {
  let pageSize = 15
  let total = chapters.length || 0
  let totalPage = parseInt(total / 15) + 1

  let currentPage = parseInt(read / pageSize) + 1
  let pickerItems = []
  let currentScope
  for (var i = 1; i <= totalPage; i++) {
    let pageScope = getCurrentScope(i, pageSize, totalPage, total)
    if (i === currentPage) {
      currentScope = pageScope
    }
    pickerItems.push(<Picker.Item key={i} style={i === currentPage ? styles.currentChapter : {}} label={`第${i}页 ${pageScope.start + 1}-${pageScope.end}`} value={i} />)
  }
  // let currentPageChapters = chapters.slice(currentScope.start, currentScope.end)
  return {
    currentPage,
    currentScope,
    pickerItems,
    totalPage
  }
}

const ChapterScreen = ScreenHoc(Chapter)
ChapterScreen.navigationOptions = ({ navigation }) => {
  let pickerItems = navigation.getParam('pickerItems')
  let currentPage = navigation.getParam('currentPage')
  console.log('navigation', pickerItems, currentPage)
  return {
    // title: `${navigation.getParam('title')}`,
    header: <View style={styles.header}>
      <Button title='上一页' onPress={() => navigation.setParams({currentPage: currentPage - 1})}></Button>
      <Picker style={styles.picker} prompt='Picker' mode = 'dialog' selectedValue={currentPage}
        onValueChange={(page, position) => navigation.setParams({currentPage: page})}>
        {pickerItems || null}
      </Picker>
      <Button title='下一页' onPress={() => navigation.setParams({currentPage: currentPage + 1})}></Button>
    </View>
    // headerLeft: <Button title='上一页'></Button>,
    // headerRight: <Button title='下一页'></Button>
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChapterScreen)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  listItem: {
    fontSize: 18,
    padding: 10,
    height: 44
  },
  currentChapter: {
    color: 'rgb(200,0,0)'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  picker: {
    flex: 1,
    height: 40
  }
})

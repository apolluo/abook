import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { getChapterDetail } from '../../../api/search'
import { contentFormat } from '../../../util/ui'
import Book from '../../base/book'
import * as types from '../../../actions/types'
import { loadContentAction, getCatalogueAction, readChapterAction } from '../../../actions/searchAction'
import { connect } from 'react-redux'
import {
  ActivityIndicator
} from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/Feather'
import THEME from '@src/ui/theme'
const READ_MODE = {
  sun: { icon: 'moon', text: '夜间' },
  moon: { icon: 'sun', text: '日间' }
}
class Content extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('title')}`,
    header: navigation.getParam('visible') ? <Text>{navigation.getParam('title')}</Text> : null
    //   headerStyle: {
    //     visible: navigation.getParam('visible') || false
    //   }
  });
  constructor (props) {
    super(props)
    const params = this.getNavigationParams()
    this.state = {
      showMenu: 'none',
      mode: 'sun',
      ...params
    }
    console.log('init', this.state, params)
  }
  getNavigationParams () {
    const { navigation } = this.props
    // const url = navigation.getParam('url')
    const read = navigation.getParam('read')
    const page = navigation.getParam('page')
    return {
      read,
      page
    }
    // const type = navigation.getParam('type')
    // this.setState({
    //   read,
    //   page,
    //   showMenu: 'none',
    //   selectedTab: 'blueTab'
    // })
    // this.state = {

    // }
  }
  componentDidMount () {
    console.log('componentDidMount', this.props.read, this.state.read)
    this.loadContent(this.state.read, this.state.page)
  }
  componentWillReceiveProps (newProps) {
    const params = this.getNavigationParams()
    console.log('componentWillReceiveProps', newProps.book.read, this.props.book.read, params.read, this.state.read)

    if (this.props.book.read === newProps.book.read && this.props.book.page === newProps.book.page) {
      return false
    } else {
      this.loadContent(newProps.book.read, newProps.book.page)
    }
  }
  shouldComponentUpdate (newProps, nextState) {
    console.log('shouldComponentUpdate', newProps.book.read, this.props.book.read, nextState, this.state.read)
    // if (this.state.read === newProps.book.read && this.state.page === newProps.book.page) {
    //   return false
    // } else {
    //   // this.loadContent()
    //   return true
    // }
    return true
  }
  // componentWillUpdate (newProps,ownProps) {
  //   console.log('componentWillUpdate', this.state.read, this.props.read)
  //   if (this.state.read !== this.props.book.read || this.state.page !== this.props.book.page) {
  //     this.loadContent(this.props.read, this.props.page)
  //   }
  // }

  loadContent (read, page) {
    let book = Object.assign({}, this.props.book, { read, page })
    console.log('loadContent', this.props.book, this.props.chapters, book)
    let _loadContent = (chapters) => this.props.loadContent(book, chapters, this.props.content).then((res) => {
      console.log('loadContent then', res)
      this.setState({
        read: read,
        page: page
      })
    })
    if (this.props.chapters) {
      _loadContent(this.props.chapters)
    } else {
      this.props.getCatalogue(book).then(res => {
        console.log('getCatalogue ok ,then loadContent', book, res)
        _loadContent(res.data)
        // this.props.loadContent(book, res.data, this.props.content)
      })
    }
  }

  showMenu () {
    // let visible = this.props.navigation.getParam('visible') || false
    // this.props.navigation.setParams({ title: this.props.book.bookName })
    // this.props.navigation.setParams({ visible: !visible })
    if (this.state.showMenu === 'none') {
      this.setState({
        showMenu: 'flex',
        position: 'absolute'
      })
    } else {
      this.setState({
        showMenu: 'none',
        position: 'relative'
      })
    }
    console.log(this.state.showMenu)
  }
  gotoPage (page) {
    let book = Object.assign({}, this.props.book, { page })
    this.props.readChapter(book, this.props.chapters, this.props.content)
  }
  nextChapter () {
    let read = parseInt(this.props.book.read)
    if (read < this.props.chapters.length - 1) {
      let index = read + 1
      this.setState({
        read: index
      })
      let book = Object.assign({}, this.props.book, { read: index, page: 0 })
      this.props.loadContent(book, this.props.chapters, this.props.content)
      // this.showContent(index, this.props.chapters[index].title, this.props.chapters[index].link, this.state.type)
    } else {
      console.log('last chapter')
    }
  }
  prefChapter () {
    let read = parseInt(this.props.book.read)
    if (read > 0) {
      let index = read - 1
      this.setState({
        read: index
      })
      let book = Object.assign({}, this.props.book, { read: index, page: 0 })
      this.props.loadContent(book, this.props.chapters, this.props.content)
      // this.showContent(index, this.props.chapters[index].title, this.props.chapters[index].link, this.state.type)
    } else {
      console.log('first chapter')
    }
  }
  navigate (tab) {
    console.log(tab)
    switch (tab) {
      case 'menu':
        this.props.navigation.navigate('Chapter', {
          ...this.props.book
        })
        break
    }
  }
  tapBar (mode) {
    switch (mode) {
      case 'menu':
        this.navigate.bind(this)('menu')
        break
      case 'mode':
        this.setState({ mode: this.state.mode === 'sun' ? 'moon' : 'sun' })
        break
    }
  }
  render () {
    let currentContent = this.props.content[this.props.book.read]
    console.log('render', this.state.read, this.props.book.read, currentContent)
    if (!currentContent) {
      return (<ActivityIndicator
        // animating={this.state.animating}
        toast
        size="large"
        text="Loading..."
      />)
    }
    let textList = contentFormat(currentContent.text)
    console.log('textList', textList)
    console.log('this.state.showMenu', this.state.showMenu)
    return (<View style={styles.container}>
      {/* <Text>{this.state.title}</Text> */}
      <Book style={styles.book} dataSource={textList}
        page={this.props.book.page}
        gotoPage={this.gotoPage.bind(this)}
        next={this.nextChapter.bind(this)}
        pref={this.prefChapter.bind(this)}
        menu={this.showMenu.bind(this)}
        mode={this.state.mode}
      ></Book>
      <View style={[styles.bottomBar, {backgroundColor: THEME[this.state.mode].barBg}]} display={this.state.showMenu} position={this.state.position}>
        <TouchableWithoutFeedback onPress={() => this.tapBar.bind(this)('menu')}>
          <View style={styles.barBtn}>
            <Icon name='menu' size={24} color={THEME[this.state.mode].iconColor} />
            <Text style={[styles.bottomBarText, {color: THEME[this.state.mode].iconColor}]}>目录</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.tapBar.bind(this)('mode')}>
          <View style={styles.barBtn}>
            <Icon name={READ_MODE[this.state.mode].icon} size={24} color={THEME[this.state.mode].iconColor} />
            <Text style={[styles.bottomBarText, {color: THEME[this.state.mode].iconColor}]}>{READ_MODE[this.state.mode].text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>)
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    chapters: state.chapter.data,
    book: { ...state.book },
    content: state.content
  }
}
const mapDispatchToProps = (dispatch) => ({
  loadContent: (book, chapters, content) => dispatch(loadContentAction(book, chapters, content, 'content')),
  getCatalogue: (params) => dispatch(getCatalogueAction(params)),
  readChapter: book => dispatch(readChapterAction(book))
})
const styles = StyleSheet.create({
  container: { position: 'relative', flex: 1 },
  book: { flex: 1 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    // backgroundColor: '#f5f5f5',
    width: '100%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  barBtn: {
    paddingHorizontal: 10
    // backgroundColor: '#ff0'
  },
  bottomBarText: {
    fontSize: 12
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Content)

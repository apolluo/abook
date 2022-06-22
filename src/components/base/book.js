import React from 'react'
import {Text, View, StyleSheet, FlatList, TouchableWithoutFeedback, UIManager,
  findNodeHandle, Dimensions} from 'react-native'
import THEME from '@src/ui/theme'

export default class Book extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   pages: [],
    //   currentPage: 0
    // }
    this.current = this.props.page || 0
    this.total = this.props.dataSource.length
    this.pageWidth = Dimensions.get('window').width
    // this.book = null
  }
  // componentDidMount () {
  //   // console.log('scrollToIndex init', this.current, this.pageWidth)
  //   // this.book.scrollToIndex({ viewPosition: 0, index: this.current })
  //   // this.getLayout(this.book).then((data) => {
  //   //   // this.pageWidth = data.width
  //   //
  //   //   this.book.scrollToIndex({ viewPosition: 0, index: this.current })
  //   // })
  // }
  // getLayout (node) {
  //   const handler = findNodeHandle(node)
  //   return new Promise(resolve => {
  //     UIManager.measure(handler, (x, y, width, height, pageX, pageY) => {
  //       resolve({x, y, width, height, pageX, pageY})
  //     })
  //   })
  // }
  componentWillReceiveProps (newProps) {
    this.current = newProps.page || 0
    this.total = newProps.dataSource.length
    console.log('componentWillReceiveProps page', this.current, this.total)
    this.book.scrollToIndex({ viewPosition: 0, index: this.current })
  }
  onLayout (e) {
    console.log(e)
    console.log('scrollToIndex init', this.current, this.pageWidth)
    this.book.scrollToIndex({ viewPosition: 0, index: this.current })
  }
  onScroll (evt) {
    // console.log('onScroll', evt)
  }
  gotoPref () {
    if (this.current > 0) {
      this.current--
      this.book.scrollToIndex({ viewPosition: 0, index: this.current })
      this.props.gotoPage(this.current)
    } else {
      console.log('pref chapter')
      this.props.pref()
    }
  }
  gotoNext () {
    console.log('gotoNext', this.current, this.total)
    if (this.current < this.total - 1) {
      this.current++
      this.book.scrollToIndex({ viewPosition: 0, index: this.current })
      this.props.gotoPage(this.current)
    } else {
      console.log('next chapter')
      this.props.next()
    }
  }
  showMenu () {
    console.log('show menu')
    this.props.menu()
  }
  renderItem (page) {
    // console.log('renderItem', page)
    let textList = []
    page.item.forEach((line, index) => {
      textList.push(<Text style={[styles.content, {color: THEME[this.props.mode].textColor}]} key={index}>{line.content}</Text>)
    })
    // console.log(textList)
    return <View key={page} style={[styles.page, {width: this.pageWidth}]}>
      <View>{textList}</View>

    </View>
  }
  render () {
    // if (!this.props.dataSource) return null
    let lines = this.props.dataSource[0].length
    // console.log('page', this.state.currentPage, this.props.dataSource)
    // if (this.book) { this.book.scrollToIndex({ viewPosition: 0, index: 0 }) }
    return (
      <View style={styles.container}>

        <FlatList style={[styles.container, {backgroundColor: THEME[this.props.mode].textBg}]}
          data={this.props.dataSource}
          ref={(ref) => this.book = ref}
          numColumns ={1}
          renderItem={this.renderItem.bind(this)}
          horizontal={true}
          initialNumToRender={lines}
          keyExtractor={(item, index) => `${index}`}
          getItemLayout={(data, index) => ({ length: this.pageWidth, offset: this.pageWidth * index, index })}
          onLayout={this.onLayout.bind(this)}
          // scrollEnabled={false}
        //   onScroll={this.onScroll}
        />
        <TouchableWithoutFeedback onPress={this.gotoPref.bind(this)}><View style={styles.pref}></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.gotoNext.bind(this)}><View style={styles.next}></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.showMenu.bind(this)}><View style={styles.menu}></View></TouchableWithoutFeedback>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  pref: {
    height: '100%',
    width: '30%',
    position: 'absolute',
    // backgroundColor: '#ccc',
    left: 0
  },
  next: {
    height: '100%',
    width: '30%',
    position: 'absolute',
    // backgroundColor: '#ccc',
    right: 0
  },
  menu: {
    height: '100%',
    width: '40%',
    position: 'absolute',
    left: '30%'
  },
  page: {
    // borderWidth: 1,
    // borderColor: '#ff0',
    alignItems: 'center'
  },
  content: {
    // color: '#604733',
    lineHeight: 34,
    fontSize: 18
    // borderColor: '#f00',
    // borderWidth: 1
  }
})

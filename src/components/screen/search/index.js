import React from 'react'
import Search from '../../base/Search'
import BookList from '../main/page/BookList'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {searchBooks, getBookStore} from '../../../actions/searchAction'
class SearchBooks extends React.Component {
  constructor (props) {
    super(props)
    const {navigation} = this.props
    const bookName = navigation.getParam('bookName')
    const rule = navigation.getParam('rule')
    this.state = {
      bookName,
      rule
    }
  }
  render () {
    return <View style={{flex: 1}}>
      <View style={{flex: 1}}><Search bookName={this.state.bookName} rule={this.state.rule}></Search></View>
      <View style={{position: 'absolute', top: 100, width: '100%', height: 600}}>
        <BookList dataSource={this.props.bookList} {...this.props} ></BookList>
      </View>
    </View>
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state.search.searchData)
  return {
    bookList: state.search.searchData

  }
}

const mapDispathToProps = (dispatch, ownProps) => ({
  getBookStore: () => dispatch(getBookStore())
  // search: query => dispatch(searchBooks(query))
})

export default connect(mapStateToProps, mapDispathToProps)(SearchBooks)

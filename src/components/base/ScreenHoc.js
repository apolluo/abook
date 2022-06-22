import React from 'react'

export default (WrappedComponent) => {
  return class Screen extends React.Component {
    constructor (props) {
      super(props)
      const {navigation} = this.props
      const bookId = navigation.getParam('bookId')
      const bookName = navigation.getParam('bookName')
      const url = navigation.getParam('url')
      const isSaved = navigation.getParam('isSaved')
      const isStored = navigation.getParam('isStored')
      const read = navigation.getParam('read')
      this.data = {
        bookName,
        url,
        bookId,
        isStored,
        isSaved,
        read
      }
      console.log('screen data', this.data)
    }
    render () {
      return <WrappedComponent params={this.data} {...this.props}></WrappedComponent>
    }
  }
}

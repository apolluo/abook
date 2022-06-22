/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import MainScreen from './src/components/screen/main'
import BookScreen from './src/components/screen/book'
import ChapterScreen from './src/components/screen/chapter'
import ContentScreen from './src/components/screen/content'
import SearchBooksScreen from './src/components/screen/search'
import store from './src/store/store'

const AppNavigator = createStackNavigator({
  Main: MainScreen,
  Book: BookScreen,
  Chapter: ChapterScreen,
  Content: ContentScreen,
  SearchBooks: SearchBooksScreen
})
const AppContainer = createAppContainer(AppNavigator)
global.store = {
  chapter: null
}
export default class App extends Component {
  render () {
    return <Provider store={store}>
      <AppContainer />
    </Provider>
  }
}

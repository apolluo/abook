import React from 'react'
import { Text, View } from 'react-native'
import { Icon, SearchBar, TabBar } from '@ant-design/react-native'
import BookMenu from './page/BookMenu'
import Home from './page/Home'

export default class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    // console.log('screen main', props, this.props)
    this.state = {
      selectedTab: 'blueTab'
    }
    this.pages = {
      BookMenu: BookMenu,
      Home: Home
    }
    this.currentPage = null
  }
  showPage (page) {
    console.log('page', page, this.props, this.props.navigation)
    if (page !== 'BookMenu' && page !== 'Home') return <Text>{page}</Text>
    const Page = this.pages[page]
    return (
      <Page {...this.props}></Page>
    )
  }
  onChangeTab (tabName) {
    this.setState({
      selectedTab: tabName
    })
  }
  render () {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="书架"
          icon={<Icon name="home" />}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
          {this.showPage('Home')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="ordered-list" />}
          title="榜单"
          badge={2}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}
        >
          {this.showPage('Koubei Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="book" />}
          title="书单"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
          {this.showPage('BookMenu')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          {this.showPage('My Tab')}
        </TabBar.Item>
      </TabBar>
    )
  }
}

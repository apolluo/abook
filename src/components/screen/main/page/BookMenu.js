import React from 'react'
import { Image, ScrollView, View, Text } from 'react-native'
import { List, Flex, ActivityIndicator, WingBlank } from '@ant-design/react-native'
import { searchBookMenu } from '../../../../api/search'
import { getURL } from '../../../../config/zhuishu/dataParse'
const Item = List.Item
const Brief = Item.Brief
let bookMenuList = []
export default class BookMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: {}
    }
    searchBookMenu().then(res => {
      console.log(res)
      this.setState({ dataSource: res })
      // this.dataSource.bookLists = res.bookLists
    })
  }
  render () {
    console.log('render', this.state.dataSource.bookLists)
    if (!this.state.dataSource.bookLists) {
      return (
        <Flex>
          <Flex.Item>
            <ActivityIndicator text="Loading..." />
          </Flex.Item>
        </Flex>
      )
    }
    this.state.dataSource.bookLists.forEach((item, index) => {
      bookMenuList.push(
        <Item wrap key={index} >
          {item.title}
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={{ uri: getURL(item.cover) }}
                style={{ width: 90, height: 120 }}
              />
              <Text style={{width: 90}}>{item.author}</Text>
            </View>
            <WingBlank size="sm" style={{width: '75%'}}>

              <Text style={{height: 160}} ellipsizeMode='tail' numberOfLines={8}>{item.desc}</Text>
            </WingBlank>
          </View>
        </Item>
      )
    })
    // console.log('bookMenuList', bookMenuList)
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List renderHeader={'书单'}>
          {bookMenuList}
        </List>
      </ScrollView>
    )
  }
}

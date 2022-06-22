import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { List, Picker, Provider, SearchBar, View } from '@ant-design/react-native'
import {
  searchBookList
} from '../../api/search'
import { connect } from 'react-redux'
import { searchBooks } from '../../actions/searchAction'
import { getResources, getRule } from '../../actions/resourceAction'
class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '美食',
      resource: -1
    }
    this.onChange = value => {
      this.setState({ value })
    }
    this.clear = () => {
      this.setState({ value: '' })
    }
    this.onSubmit = value => {
      if (this.props.target === 'blank') {
        this.props.navigation.navigate('SearchBooks', {
          bookName: value,
          rule: this.props.rule
        })
      } else {
        this.props.search(value, this.props.rule)
      }

      // searchBookList(value).then(data => {
      //   // console.log(data)
      //   // console.log(this.props.callback)
      //   this.props.callback(data)
      // })
    }
    this.onPress = () => {
      this.props.getResources()
    }
    this.onChangeResource = (v) => {
      this.props.getRule(v[0])
      this.setState({
        resource: v
      })
    }
  }
  componentDidMount () {
    const { bookName, rule } = this.props
    if (bookName && rule) {
      this.props.search(bookName, rule)
    }
  }

  render () {
    // return <Button type="primary">primary</Button>
    console.log('resources', this.props)
    return (
      <Provider theme={{
        fill_body: '#f00',
        // color_text_base: '#ff0',
        fill_base: '#0f0',
        border_color_base: '#dddddd',
        list_title_height: 30,
        actionsheet_item_height: 50,
        tabs_height: 42,
        option_height: 42,
        v_spacing_xl: 21,
        border_width_md: 1,
        toast_zindex: 1999,
        action_sheet_zindex: 1000,
        popup_zindex: 999,
        modal_zindex: 999
        // list_item_height: 144

      }}>
        <View style={{ marginTop: 0, marginBottom: 10, height: 100 }}>

          <List>
            <Picker
              data={this.props.resource}
              cols={1}
              value={this.state.resource}
              onChange={this.onChangeResource}
            >
              <List.Item arrow="horizontal" onPress={this.onPress}>
                选择来源
              </List.Item>
            </Picker>
          </List>

          <SearchBar
            style={STYLE.ui}
            defaultValue=""
            placeholder="请输入书名"
            onSubmit={this.onSubmit}
            // onBlur={this.onSubmit}
            onCancel={this.clear}
            onChange={this.onChange}
            showCancelButton
          />
        </View>
      </Provider>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let resource = [{
    label: '请选择来源',
    value: -1
  }]
  if (state.resource) {
    resource = state.resource
  }
  return {
    resource: resource,
    rule: state.rule
  }
}
const mapDispathToProps = (dispatch, ownProps) => ({
  search: (value, rule) => {
    console.log('searchBooks', ownProps.target === 'blank')
    if (ownProps.target) {
      dispatch(searchBooks(value, rule, ownProps.target))
    } else {
      dispatch(searchBooks(value, rule))
    }
  },
  getResources: () => dispatch(getResources()),
  getRule: index => dispatch(getRule(index))
})

const STYLE = StyleSheet.create({
  ui: {
    height: 30,
    width: 120
  }
})
export default connect(mapStateToProps, mapDispathToProps)(Search)

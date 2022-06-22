import rules from '../config/rules'
import * as types from '../actions/types'

const initialState = [{
  lable: '追书神器',
  value: 0
}]
export default function getResource (state = initialState, action) {
  switch (action.type) {
    case types.RESOURCE_LIST:
      return action.data
    default:
      return state
  }
}

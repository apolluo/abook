import rules from '../config/rules'
import * as types from './types'

export const getResources = () => {
  let resources = []
  rules.forEach((rule, i) => {
    resources.push({
      label: rule.label,
      value: i
    })
  })
  return (dispatch) => {
    dispatch({
      type: types.RESOURCE_LIST,
      data: resources
    })
  }
}
export const getRule = index => {
  return dispatch => {
    dispatch({
      type: types.GET_RULE,
      data: rules[index] ? rules[index].rules : null
    })
  }
}

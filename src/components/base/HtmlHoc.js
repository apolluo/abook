import React from 'react'

const HtmlHoc = (WrappedComponent) => {
  return class HtmlCom extends React.Component {
    render () {
      const {children} = this.props
      let res = []
      if (typeof children === 'string') {
        let htmls = children.split('<em>')
        htmls.forEach((html, index) => {
          let texts = html.split('</em>')
          if (texts[0]) {
            res.push(<WrappedComponent key={`title-${index}`} style={{color: '#f00'}}>{texts[0]}</WrappedComponent>)
          }
          if (texts[1]) {
            res.push(<WrappedComponent key={index} >{texts[1]}</WrappedComponent>)
          }
        })
      }
      return res
    }
  }
}
export default HtmlHoc

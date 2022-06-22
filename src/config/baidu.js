const rules = [{
  domain: `www.baidu.com`,
  encode: 'utf8',
  searchApi: key => `http://www.baidu.com/s?ie=utf-8&wd=${key}`,
  // 提取搜索内容
  extractRule: {
    result: '#content_left .result',
    directoryUrl: 'h3 a|href',
    title: 'h3 a',
    logo: '.general_image_pic img|src',
    desc: '.c-abstract',
    comefrom: '.c-showurl'
  },
  // 工作在搜索引擎提取的url中
  directoryUrlRegexp: /^\/read\/\d+\/?(index\.html)?$/,
  // 工作在搜索引擎提取页面
  titleRule: /.*(?=最新章节)/,
  // 工作在列表页面
  authorRule: $ => $('h1.bname').next('div').find('a:eq(0)').text(),
  // 工作在列表页面,返回一个a标签
  articleLinkRule: $ => $('td>.dccss>a'),
  // 工作在文章页面
  articleContentRule: $ => {
    $('#content br').replaceWith('\r\n')
    return $('#content').text()
  }
}]
export default rules
// https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=e55f35080015d4cd&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E7%B2%BE%E5%88%86%E5%86%99%E6%89%8B%E6%88%90%E7%A5%9E%E8%AE%B0%20%E5%B0%8F%E8%AF%B4&oq=%25E7%25B2%25BE%25E5%2588%2586%25E5%2586%2599%25E6%2589%258B%25E6%2588%2590%25E7%25A5%259E%25E8%25AE%25B0%2520%25E5%25B0%258F%25E8%25AF%25B4&rsv_pq=e55f35080015d4cd&rsv_t=58f522iPZdATJphac6On8x3JXz8drBHv%2BF84BaAjAef21G47hBWuYipVxT4&rqlang=cn&rsv_enter=0&rsv_dl=tb&bs=%E7%B2%BE%E5%88%86%E5%86%99%E6%89%8B%E6%88%90%E7%A5%9E%E8%AE%B0%20%E5%B0%8F%E8%AF%B4&rsv_sid=1431_21082_29522_29518_28518_29099_29567_28838_29220&_ss=1&clist=&hsug=&f4s=1&csor=10&_cr1=41131
// https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=7042E4B7BAA81782&ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=sdfdfdffs&rsv_pq=80f016b50018b4b9&rsv_t=4cd6U7PVa1weML17bSlFOg3O65N3q4MAgUYgXSMxcmN5a3yf8A0JzDDa98k&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=10&rsv_sug1=7&rsv_sug7=101&inputT=16960&rsv_sug4=22771&rsv_sid=1431_21082_29522_29518_28518_29099_29567_28838_29220&_ss=1&clist=&hsug=&f4s=1&csor=9&_cr1=30278

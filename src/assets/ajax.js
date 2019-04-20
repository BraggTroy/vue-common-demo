/**
 * Created by Bragg Troy on 2019/4/20.
 */
export default function (params) {
  let cof = {
    type: 'get',
    url: '',
    async: true,
    data: {},
    success: function () {},
    error: function () {},
  }
  let config = Object.assign({}, cof, params)


  var xhr = new XMLHttpRequest()
  xhr.open(config.type, config.url, config.async)
  xhr.onreadystatechange = function() {
    // readyState == 4说明请求已完成
    if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
      // 从服务器获得数据
      config.success(xhr.responseText)
    } else {
      config.error()
    }
  };
  xhr.send(config.data)
}


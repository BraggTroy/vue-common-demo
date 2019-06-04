
/*数组或者对象的深拷贝*/
export const deepCopy = (data) => {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if ( t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if ( t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}


window.Date.prototype.format = function (format) {
  let o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    'S': this.getMilliseconds() // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
};
// 将日期格式化输出
export const timeFormat = (val, format) => {
  if (!val) {
    return val
  }
  // 没有设置格式
  if (!format) {
    format = 'yyyy-MM-dd';
  }
  if (format === 'timeStamp') {
    if (/^[0-9]{0,}$/.test(val)) {
      return val;
    } else {
      return new Date(Date.parse(val.replace(/-/g, '/')));
    }
  } else {
    // 判断是否为时间戳，是则转为格式化
    if (/^[0-9]{0,}$/.test(val)) {
      return new Date(val).format(format);
    } else {
      return new Date(Date.parse(val.replace(/-/g, '/'))).format(format);
    }
  }
};

// 获取当前周几
export const getDay = function (date) {
  let day = new Date(Date.parse(date.replace(/-/g, '/'))).getDay();
  let dayTxt = ['日', '一', '二', '三', '四', '五', '六'];
  return dayTxt[day];
};


// 查询字符串
export const getQueryStr = function (key) {
  let qstr = location.href.split('?')[1];
  let store = {}; let res = '';
  if (qstr){
    qstr.split('&').forEach(item => {
      let spt = item.split('=');
      store[spt[0]] = spt[1];
      if (key && key === spt[0]) {
        res = spt[1];
      }
    });
  }
  if (key) return res;
  else return store
};

// 将json转为查询字符串
export const toQueryStr = function (object) {
  let objstr = JSON.stringify(object);
  return objstr.replace(/":"/g, '=').replace(/","/g, '&').replace('{"', '?').replace('"}', '');
};

// 数值00补全
export const formatNum = function (num) {
  return num < 10 ? '0' + num : num.toString();
};

export const isFunction = function (fn) {
  return typeof fn === 'function';
};


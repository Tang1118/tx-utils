/**
 * set localStore
 * @param id 用户id
 * @param key
 * @param value
 */
export function saveToLocal(id, key, value) {
	let uxwm = window.localStorage.__uxwm__
	if (!uxwm) {
		console.log(1)
		uxwm = {}
		uxwm[id] = {}
	} else {
		console.log(2)
		uxwm = JSON.parse(uxwm)
		if (!uxwm[id]) {
			uxwm[id] = {}
		}
	}
	uxwm[id][key] = value
	window.localStorage.__uxwm__ = JSON.stringify(uxwm)
}
/**
 * get localStorage
 * @param id 用户id
 * @param key
 * @param def 如果没有就传默认
 */
export function loadFromLocal(id, key, def) {
	let uxwm = window.localStorage.__uxwm__
	if (!uxwm) {
		return def
	}
	uxwm = JSON.parse(uxwm)[id]
	if (!uxwm) {
		return def
	}
	let ret = uxwm[key]
	return ret || def
}

/*
 * 判断是否在微信浏览器
 */
export const isWechat = function () {
	const ua = window.navigator.userAgent.toLowerCase()
	const wechatInfo = ua.match(/MicroMessenger\/([\d.]+)/i)
	if (!wechatInfo) {
		// 仅支持微信
		return 0
	} else if (wechatInfo[1] < '5.0') {
		// 仅支持微信5.0以上版本
		return 1
	} else {
		return 2
	}
}

export const formatTime = function (date, mode) {
	if (!date) {
		return '-'
	}
	let d0 = new Date(0)
	let d1 = new Date('1970/01/01 08:00:00')
	date = parseInt(date) + ((d1.getTime() - d0.getTime()) / 1000)
	let d = new Date(parseInt(date) * 1000)
	let format = mode
	let o = {
		'M+': d.getMonth() + 1, // month
		'd+': d.getDate(), // day
		'h+': d.getHours(), // hour
		's+': d.getSeconds(), // second
		'm+': d.getMinutes(), // minute
		'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
		'S': d.getMilliseconds() // millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return format
}

/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 正则：开始是?或&,第二个 非?或&的字符一个或多个 = 后面非?或&的字符一个或多个
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=123456','&a=b']
  if (arr) {
    arr.forEach((item) = > {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    }
  )
  }
  return obj
}







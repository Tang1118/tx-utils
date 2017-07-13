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
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
};

/**
 * 用于校验页面中的特殊字符，手机号，电子邮箱等等。
 *引用 validate.XXX
 */
// 校验数字
exports.isNum = (num, callback) => {
    var boolStr;
    var reg = /^(\d)$/;
    boolStr = reg.test(num);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验6位验证码
exports.isRegNum = (num, callback) => {
    var boolStr;
    var reg = /^(\d){6}$/;
    boolStr = reg.test(num);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验手机号码
exports.checkPhone = (tel, callback) => {
    var boolStr;
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    boolStr = reg.test(tel);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 检验密码6-20位
exports.isPwd = (pwd, callback) => {
    var boolStr;
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    boolStr = reg.test(pwd);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验电子邮箱
exports.checkEmail = (val, callback) => {
    var boolStr;
    var filter = /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    boolStr = filter.test(val);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验2到20个字的中文
exports.isName = (str, callback) => {
    var boolStr;
    var reg = /^[\u4e00-\u9fa5]{2,30}$/;
    boolStr = reg.test(str);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验15位和18位的身份证号码
exports.checkIdCardNo = (idCardNo, callback) => {
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    var boolStr;
    boolStr = regIdCard.test(idCardNo);
    callback ? callback(boolStr) : '';
    return boolStr;
};
// 校验出生日期
exports.checkBirthDayCode = (birDayCode) => {
    // 过滤"-"或者".";
    var reg = /\-|\./g;
    birDayCode = birDayCode.replace(reg, '');
    var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
    if (!check) return false;
    var yyyy = parseInt(birDayCode.substring(0, 4), 10);
    var mm = parseInt(birDayCode.substring(4, 6), 10);
    var dd = parseInt(birDayCode.substring(6), 10);
    var xdata = new Date(yyyy, mm - 1, dd);
    if (xdata > new Date()) {
        return false;// 生日不能大于当前日期
    } else if ((xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === dd)) {
        return true;
    } else {
        return false;
    }
};
// 校验特殊字符
exports.isSingle = (num, callback) => {
    var boolStr;
    var reg = /^[^[\u4e00-\u9fa50-9a-zA-Z\s\W\w]*[^(\')(\%)(\^)(\&)(\*)(\?)(\？)(\`)(\~)(\!)(\@)(\#)(\$)(\\)]{1,}$/;
    boolStr = reg.test(num);
    callback ? callback(boolStr) : '';
    return boolStr;
};

/**
 * 校验商户名称--120位
 * @param name
 * @returns {string}
 */
exports.merchantName = (name, callback) => {
    var regCh = name.match(/[\u4e00-\u9fa5]/g) ? name.match(/[\u4e00-\u9fa5]/g).length : 0;
    var regStr = name.match(/\w/g) ? name.match(/\w/g).length : 0;
    var boolStr;
    boolStr = (regCh * 16 + regStr * 8) >= 120;
    callback ? callback(boolStr) : '';
    return boolStr;
};

/**
 * 校验商户代码--30位
 * 1-6位的数字
 * @param code
 * @returns {string}
 */
exports.merchantCode = (code, callback) => {
    var regCode = /^\d{1,6}$/;
    var boolStr;
    boolStr = regCode.test(code);
    callback ? callback(boolStr) : '';
    return boolStr;
};

/**
 * 校验姓名--30位
 * @param name
 * @param callback
 * @returns {string}
 */
exports.personName = (name, callback) => {
    var regCh = name.match(/[\u4e00-\u9fa5]/g) ? name.match(/[\u4e00-\u9fa5]/g).length : 0;
    var regStr = name.match(/\w/g) ? name.match(/\w/g).length : 0;
    var boolStr;
    boolStr = (regCh * 16 + regStr * 8) >= 30;
    callback ? callback(boolStr) : '';
    console.log(boolStr);
    return boolStr;
};

/**
 * 校验日期 yyyy-mm-dd
 * @param date
 * @param callback
 * @returns {string}
 */
exports.checkoutDate = (date, callback) => {
    var regDate = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
    var boolStr;
    boolStr = regDate.test(date);
    callback ? callback(boolStr) : '';
    return boolStr;
};

/**
 * 商户城市--20位 2-5个汉字 待完善
 * @param city
 * @param callback
 * @returns {string}
 */
exports.cityName = (city, callback) => {
    var regCity = /^[\u4e00-\u9fa5]{2,5}$/;
    var boolStr;
    boolStr = regCity.test(city);
    callback ? callback(boolStr) : '';
    return boolStr;
};






/*
* @Author: suwei
* @Date:   2017-10-30 08:05:21
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-30 10:07:04
*/
'use strict';
var _mm = require('util/mm.js');

var _user = {
	//退出登录
	logout : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success: resolve,
			error  : reject
		});
	},

	//检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success: resolve,
			error  : reject
		});
	}
}

module.exports = _user;
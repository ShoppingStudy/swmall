/*
* @Author: suwei
* @Date:   2017-10-30 08:05:21
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-02 16:30:21
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
	},

	//登录
	login : function(userInfo,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/login.do'),
			method : 'POST',
			data   : userInfo,
			success: resolve,
			error  : reject
		});
	},

	//检查用户名是否存在
	checkUsername : function(username,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/check_valid.do'),
			method : 'POST',
			data   : {
				type : 'username',
				str  : username
			},
			success: resolve,
			error  : reject
		});
	},

	//注册用户
	register : function(userInfo,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/register.do'),
			method : 'POST',
			data   : userInfo,
			success: resolve,
			error  : reject
		});
	},

	//获取密码提示问题
	getQusetion : function(username,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/for_get_question.do'),
			method : 'POST',
			data   : {username : username },
			success: resolve,
			error  : reject
		});
	},

	//验证密码提示问题答案
	checkAnswer : function(answerData,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/for_check_answer.do'),
			method : 'POST',
			data   : answerData,
			success: resolve,
			error  : reject
		});
	},

	//忘记密码时的重置密码
	forgetResetPass : function(answerData,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/for_reset_password.do'),
			method : 'POST',
			data   : answerData,
			success: resolve,
			error  : reject
		});
	},

	//获取用户信息 
	getUserInfo : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success: resolve,
			error  : reject
		});
	},

	//更新用户信息
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/update_infomation.do'),
			method : 'POST',
			data   : userInfo,
			success: resolve,
			error  : reject
		});
	},

	//更新密码
	resetPassword : function(passInfo,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/reset_password.do'),
			method : 'POST',
			data   : passInfo,
			success: resolve,
			error  : reject
		});
	},

}

module.exports = _user;
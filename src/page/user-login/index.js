/*
* @Author: suwei
* @Date:   2017-10-16 22:57:39
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-31 13:42:50
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.login-title').hide().siblings('.login-msg').show()
			.find('.error-msg').text(errMsg);
	},
	hide : function(){
		$('.login-title').show().siblings('.login-msg').hide()
			.find('.error-msg').text('');
	}
}

//page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击登录按钮，提交表单
		$("#submit").click(function(){
			_this.submit();
		});
		//按下回车，提交表单
		$('.form-control').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			username : $.trim($('.input-username').val()),
			password : $.trim($('.input-password').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		result.status = true;
		return result;
	}
};
$(function(){
	page.init();
});
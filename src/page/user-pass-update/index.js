/*
* @Author: suwei
* @Date:   2017-11-02 14:38:48
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-02 16:31:43
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');

navSide.init({
	name : 'user-pass-update'
});
//page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$('#passReset').click(function(){
			_this.submit();
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			passwordOld     : $.trim($('#inputPasswordOld').val()),
			passwordNew     : $.trim($('#inputPasswordNew').val()),
			passwordNewConf : $.trim($('#inputPasswordConf').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.resetPassword(formData,function(res){
				window.location.href = './result.html?type=updatePass';
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		}else{
			//错误提示
			_mm.errorTips(validateResult.msg);
		}
	},
	//表单验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		if(!_mm.validate(formData.passwordOld,'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		if(!_mm.validate(formData.passwordNew,'require')){
			result.msg = '新密码不能为空';
			return result;
		}
		if(formData.passwordNew.length < 5){
			result.msg = '密码长度不能小于5位';
			return result;
		}
		if(!_mm.validate(formData.passwordNewConf,'require')){
			result.msg = '确认密码不能为空';
			return result;
		}
		if(formData.passwordNew !== formData.passwordNewConf){
			result.msg = '密码和确认密码不一致';
			return result;
		}
		result.status = true;
		return result;
	}
	
};
$(function(){
	page.init();
});

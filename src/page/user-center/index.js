/*
* @Author: suwei
* @Date:   2017-11-02 09:01:11
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-02 14:35:26
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var template = require('./index.string')


//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.update-msg').show().find('.error-msg').text(errMsg);
	},
	hide : function(){
		$('.update-msg').hide().find('.error-msg').text('');
	}
}


//page 逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		
		//采用事件委托，保存修改
		$(document).on('click','#saveUpdate',function(){
			_this.submit();
		});
	},
	loadUserInfo : function(){
		var _this = this;
		_user.getUserInfo(function(res){
			_this.rendUserCenterHtml(template,res);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//渲染个人中心页面
	rendUserCenterHtml:function(template,res){
		var html = _mm.renderHtml(template,res);
		$('.userCenter-content').html(html);
	},
	//提交表单
	submit : function(){
		var _self = self;
		var formData = {
			phone    : $.trim($('#inputPhone').val()),
			email    : $.trim($('#inputEmail').val()),
			question : $.trim($('#inputQuestion').val()),
			answer   : $.trim($('#inputAnswer').val())		
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.updateUserInfo(formData,function(res){
				window.location.reload();
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
		if(!_mm.validate(formData.phone,'require')){
			result.msg = '手机号码不能为空';
			return result;
		}
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式错误';
			return result;
		}
		if(!_mm.validate(formData.email,'require')){
			result.msg = '邮箱不能为空';
			return result;
		}
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式错误';
			return result;
		}
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题答案不能为空';
			return result;
		}
		result.status = true;
		return result;
	}
};
$(function(){
	page.init();
});
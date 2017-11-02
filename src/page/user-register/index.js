/*
* @Author: suwei
* @Date:   2017-10-31 15:14:18
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-31 17:35:21
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.register-msg').show().find('.error-msg').text(errMsg);
	},
	hide : function(){
		$('.register-msg').hide().find('.error-msg').text('');
	}
}

//page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//验证username
		$('.input-username').blur(function(){
			var username = $.trim($(this).val());
			//异步验证username是否已经存在
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		//点击注册按钮，提交表单
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
			username         : $.trim($('.input-username').val()),
			password         : $.trim($('.input-password').val()),
			passwordConfirm  : $.trim($('.input-password-confirm').val()),
			phone            : $.trim($('.input-phone').val()),
			email            : $.trim($('.input-email').val()),
			question         : $.trim($('.input-question').val()),
			answer           : $.trim($('.input-answer').val())
		},
		//表单验证结果
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register';
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
		if(formData.password.length < 5){
			result.msg = '密码长度不能小于5位';
			return result;
		}
		if(!_mm.validate(formData.passwordConfirm,'require')){
			result.msg = '确认密码不能为空';
			return result;
		}
		if(formData.password !== formData.passwordConfirm){
			result.msg = '密码和确认密码不一致';
			return result;
		}
		if(!_mm.validate(formData.phone,'require')){
			result.msg = '手机号不能为空';
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
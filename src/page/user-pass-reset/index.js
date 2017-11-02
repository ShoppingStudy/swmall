/*
* @Author: suwei
* @Date:   2017-11-01 08:58:47
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-01 18:17:16
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');



//page 逻辑部分
var page = {
	answerData : {
		username : '',
		question : '',
		answer   : '',
		forgetToken	 : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		$('.start').addClass('active');
		$('.step1').addClass('active');
		this.loadStepUsername();
	},
	loadStepUsername : function(){
		$('.username-field').css('display','table');
		$('.usernameStep-field').css('display','table');
	},
	loadStepQusetion : function(res){
		$('.step2').addClass('active');
		$('.username-field').hide().siblings('.usernameStep-field').hide();
		$('.question-field').css('display','table').siblings('.questionStep-field').css('display','table');
		$('.pass-reset-title').text('您的密码提示问题为：'+res);
	},
	loadStepPasswordNew : function(){
		$('.step3').addClass('active');
		$('.username-field').hide().siblings('.usernameStep-field').hide();
		$('.question-field').hide().siblings('.questionStep-field').hide();
		$('.passwordNew-field').css('display','table').siblings('.passwordNewStep-field').css('display','table');
		$('.pass-reset-title').text('请输入新密码');
	},
	bindEvent : function(){
		var _this = this;
		//点击输入用户名的下一步，提交表单
		$("#nextStep-username").click(function(){
			var username = $.trim($('.input-username').val());
			if(username){
				_user.getQusetion(username,function(res){
					_this.loadStepQusetion(res);
					_this.answerData.question = res;
					_this.answerData.username = username;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips("用户名不能为空");
			}
		});

		//点击输入答案的下一步，提交表单
		$("#nextStep-question").click(function(){
			var answer = $.trim($('.input-question').val());
			if(answer){
				_this.answerData.answer = answer;
				_user.checkAnswer(_this.answerData,function(res){
					_this.loadStepPasswordNew();
					_this.answerData.forgetToken = res;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips("验证答案不能为空");
			}
		});

		//点击输入新密码的下一步，提交表单
		$("#nextStep-passwordNew").click(function(){
			var passwordNew = $.trim($('.input-passwordNew').val());
			if(passwordNew){
				_this.answerData.passwordNew = passwordNew;
				_user.forgetResetPass(_this.answerData,function(res){
					window.location.href='./result.html?type=forgetResetPass';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips("新密码不能为空");
			}
		});

	},
	
};
$(function(){
	page.init();
});
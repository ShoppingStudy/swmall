/*
* @Author: Administrator
* @Date:   2017-10-29 16:49:23
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-02 14:21:46
*/

//导航
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		//退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				_mm.doLogin();
			}, function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo :  function(){
		_user.checkLogin(function(res){
			$('.user-notlogin').hide().siblings('.user-login').show()
				.find('.username').text(res.username);
		}, function(errMsg){
			//do nothing
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		}, function(errMsg){
			$('.nav .cart-count').text(0);
		});
	}
};

module.exports = nav.init();
/*
* @Author: Administrator
* @Date:   2017-10-29 16:49:23
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-29 17:51:04
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');

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
	},
	//加载用户信息
	loadUserInfo :  function(){

	},
	//加载购物车数量
	loadCartCount : function(){

	}
};

module.exports = nav.init();
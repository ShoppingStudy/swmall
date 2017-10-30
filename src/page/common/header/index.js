/*
* @Author: suwei
* @Date:   2017-10-30 12:39:36
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-30 16:32:53
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索，提交搜索框
		$("#search-btn").click(function(){
			_this.searchSubmit();
		});
		//按下回车，提交搜索框
		$("#search-input").keyup(function(e){
			//13是回车键的keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//回填keyword到搜索框
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	//提交搜索框
	searchSubmit: function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交时时候有keyword，则跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.errorTips('请输入要搜索的商品');
		}
	}
};

header.init();
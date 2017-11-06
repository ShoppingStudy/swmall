/*
* @Author: suwei
* @Date:   2017-11-06 09:55:01
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-06 17:20:31
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _seckill = require('service/seckill-service.js');
var template = require('./index.string');


//page 逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadSeckillList();
	},
	bindEvent : function(){
		
	},
	loadSeckillList : function(){
		var _this = this;
		_seckill.getList(function(res){
			for (var i = 0,length = res.list.length; i < length; i++) {
				res.list[i].startTime = _this.formatDate(res.list[i].startTime);
				res.list[i].endTime = _this.formatDate(res.list[i].endTime);
				res.list[i].createTime = _this.formatDate(res.list[i].createTime);
			}
			_this.rendSeckillListHtml(template,res);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//渲染秒杀列表
	rendSeckillListHtml:function(template,res){
		var html = _mm.renderHtml(template,res);
		$('.list').html(html);
	},

	//格式化时间
    formatDate :function(time){
	  var date = new Date(time);   
	  var year = date.getYear()+1900;     
	  var month= date.getMonth()+1;     
	  var day  = date.getDate();     
	  var hour = date.getHours();     
	  var minute = date.getMinutes();     
	  var second=date.getSeconds();     
	  return   year+"-"+month+"-"+day+"   "+hour+":"+minute+":"+second;     
	}
	
};
$(function(){
	page.init();
});
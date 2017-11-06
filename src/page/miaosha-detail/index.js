/*
* @Author: suwei
* @Date:   2017-11-06 15:48:05
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-06 17:34:44
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/countDown/index.js');
var _mm = require('util/mm.js');
var _seckill = require('service/seckill-service.js');
var template = require('./index.string');

//page 逻辑部分
var page = {
	Data : {
		seckillId : '',
		name      : '',
		number    : '',
		startTime : '',
		endTime   : '',
		createTime: ''
	},
	init : function(){	
		this.bindEvent();
	},
	bindEvent : function(){
		this.loadSecKillDetail();
		//执行秒杀
		var _this = this;
		$(document).on('click','#excute',function(){
			var secData = {
				seckillId : _this.Data.seckillId,
				md5       : _this.Data.md5
			}
			_seckill.execute(secData,function(res){
				console.log(res);
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//获取对应id的商品详情
	loadSecKillDetail : function(){
		var _this = this;
		var seckillId = _mm.getUrlParam('seckillId');
		_seckill.getDetail(seckillId,function(res){
			_this.Data = $.extend({},_this.Data,res);
			_this.loadTime();
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//获取系统当前时间
	loadTime : function(){
		var _this = this;
		_seckill.getNow(function(res){
			//当前系统时间大于结束时间，秒杀已结束
			if(res > _this.Data.endTime){
				$('.kill').html('秒杀已结束');
			}else if(res < _this.Data.startTime){
				_this.killCountDown(_this.Data.startTime + 1000);
			}else{
				//执行秒杀
				_this.exposerSecKill(_this.Data.seckillId);
			}
									
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	
	//倒计时
	killCountDown : function(startTime){
		var _this = this;
		var killTime = new Date(startTime);
		var killBox =  $(".kill");
		killBox.countdown(killTime, function(event) {
		    var format = event.strftime('秒杀倒计时：%D天 %H时 %M分 %S秒');
		    $(this).html(format);
		 }).on('finish.countdown',function(){ //计时完成
		 	//获取秒杀地址，控制显示地址，执行秒杀
		 	_this.exposerSecKill(_this.Data.seckillId);
		 });
	},

	//暴露秒杀地址
	exposerSecKill : function(seckillId){
		var _this = this;
		_seckill.exposer(seckillId,function(res){
			_this.Data.md5 = res.md5;
			$(".kill").countdown(_this.Data.endTime, function(event) {
			    var format = event.strftime('秒杀结束时间：%D天 %H时 %M分 %S秒');
			    $(this).html(format);
			 });
			_this.rendSeckillDetailHtml(template,_this.Data);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//渲染秒杀详情
	rendSeckillDetailHtml:function(template,res){
		var html = _mm.renderHtml(template,this.Data);
		$('.cont').html(html);
	},
};
$(function(){
	page.init();	
});



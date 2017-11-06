/*
* @Author: suwei
* @Date:   2017-11-06 11:34:24
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-06 17:37:45
*/
'use strict';
var _mm = require('util/mm.js');

var _seckill = {
	//获取秒杀商品列表
	getList : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/seckill/list'),
			success: resolve,
			error  : reject
		});
	},

	//查询单个秒杀商品
	getDetail  : function(seckillId,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/seckill/'+seckillId+'/detail'),
			data   : {seckillId : seckillId},
			success: resolve,
			error  : reject
		});
	},

	//获取系统当前时间
	getNow : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/seckill/time/now'),
			success: resolve,
			error  : reject
		});
	},

	//执行秒杀
	execute : function(secData,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/seckill/'+secData.seckillId+'/'+secData.md5+'/execute'),
			data   : secData,
			success: resolve,
			error  : reject
		});
	},

	//暴露秒杀的接口地址
	exposer : function(seckillId,resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/seckill/'+seckillId+'/exposer'),
			data   : {seckillId : seckillId},
			success: resolve,
			error  : reject
		});
	},
}

module.exports = _seckill;
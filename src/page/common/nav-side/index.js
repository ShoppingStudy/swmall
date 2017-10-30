/*
* @Author: suwei
* @Date:   2017-10-30 16:53:29
* @Last Modified by:   suwei
* @Last Modified time: 2017-10-30 18:08:13
*/
'use strict';
require('./index.css');
var template = require('./index.string');
var _mm = require('util/mm.js');


//侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{name: 'user-center',desc: '个人中心', href: './user-center.html'},
			{name: 'order-list',desc: '我的订单', href: './order-list.html'},
			{name: 'user-pass-update',desc: '修改密码',href: './user-pass-update.html'},
			{name: 'about',desc: '关于SWMALL', href: './about.html'}
		]
	},
	init : function(option){
		//合并选项
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染侧边导航
	renderNav : function(){
		//计算active数据
		for (var i = 0,iLength=this.option.navList.length; i<iLength; i++) {
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		}

		//渲染list数据
		var navHtml = _mm.renderHtml(template,{
			navList : this.option.navList
		});

		//把html放入容器
		$('.nav-content').html(navHtml);
	}
};

module.exports = navSide;
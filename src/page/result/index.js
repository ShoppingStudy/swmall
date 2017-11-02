/*
* @Author: suwei
* @Date:   2017-10-31 08:25:30
* @Last Modified by:   suwei
* @Last Modified time: 2017-11-01 18:18:16
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type     = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
});
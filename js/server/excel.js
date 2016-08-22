/*
 * @Author: xz06213
 * @Date:   2016-08-15 16:55:09
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-22 16:41:49
 */

'use strict';
var fs = require('fs'),
	excel = require('node-xlsx');
exports.readExcel = function(filepath) {
	return excel.parse(filepath);
}
exports.writeExcel = function(filePath, data) {
	var res = {
		success: true,
		message: 'Success!'
	}
	data[0].name = '第一个表格';
	var file = excel.build(data);
	//同步写入
	fs.writeFileSync(filePath, file, 'binary');

	// var data1 = [
	// 	[一列, 而列, 三列],
	// 	[true, false, null, 'sheetjs'],
	// 	['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
	// 	['baz', null, 'qux']
	// ];
	// var obj = [{
	// 	'name': '第一个',
	// 	'data': data1
	// },{
	// 	'name': '第二个',
	// 	'data': data1
	// },{
	// 	'name': '第三个',
	// 	'data': data1
	// }];
	// var file = excel.build(obj);
	// fs.writeFileSync(filePath, file, 'binary');
	return res;
}

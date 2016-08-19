/*
 * @Author: xz06213
 * @Date:   2016-08-15 16:55:09
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-16 18:30:46
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
	// fs.writeFile(filePath, data, function(err) {
	// 	if (err) {
	// 		res.success = false;
	// 		res.message = ex;
	// 	}
	// });
excel.save(data,filePath);
	return res;
}

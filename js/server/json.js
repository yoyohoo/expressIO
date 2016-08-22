/*
 * @Author: xz06213
 * @Date:   2016-08-15 17:14:15
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-22 17:48:48
 */

'use strict';
var fs = require('fs');
exports.readJson = function(filePath) {
	var result = {
		success: true
	};
	try {
		result.data = fs.readFileSync(filePath, 'utf8');
	} catch (ex) {
		result.success = false;
		result.message = ex;
	}
	return result;
}
exports.writeJson = function(filePath, data) {
	var result = {
		success: true
	};
	try {
		fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
	} catch (ex) {
		result.success = false;
		result.message = ex;
	}
	return result;
}

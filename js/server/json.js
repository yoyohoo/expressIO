/*
 * @Author: xz06213
 * @Date:   2016-08-15 17:14:15
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-22 16:33:43
 */

'use strict';
var fs = require('fs');
exports.writeJson = function(filepath, data, callback) {
	// fs.writeFile(filePath, data, function(err) {
	// 	if (err) {
	// 		res.success = false;
	// 		res.message = ex;
	// 	}
	// });
	fs.writeFile(filepath, data, 'utf8', callback);
}

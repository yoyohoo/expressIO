/*
 * @Author: xz06213
 * @Date:   2016-08-15 17:14:15
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-15 17:15:32
 */

'use strict';
var fs = require('fs');
exports.writeJson = function(filepath, data, callback) {
	fs.writeFile(filepath, data, 'utf8', callback);
}

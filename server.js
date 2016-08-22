/*
 * @Author: xz06213
 * @Date:   2016-06-20 11:32:45
 * @Last Modified by:   xz06213
 * @Last Modified time: 2016-08-22 16:36:33
 */

'use strict';
// lib
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	path = require('path');
// parse post data to json
app.use(bodyParser.json());

// custom
var excel = require('./js/server/excel'),
	json = require('./js/server/json');

//allow client to view
app.use('/js', express.static(__dirname + '/js/client'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

// logger before every request 
var logger = function(req, res, next) {
		console.log('Logger:', req.params);
		next();
	},
	requestTime = function(req, res, next) {
		req.requestTime = Date.now();
		next();
	};
app.use(logger);
app.use(requestTime);

// handle error
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// home page
app.get('/', function(req, res) {
	console.log(req.requestTime);
	res.sendFile(path.join(__dirname + '/index.html'));
});

// data function
app.get('/readExcel/:fileName', function(req, res) {
	var fileName = req.params.fileName,
		data = excel.readExcel(__dirname + '/data/excel/' + fileName);
	res.send(data);
})
app.post('/writeExcel/:fileName', function(req, res) {

	// if (req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest') {
	// 	// 是AJAX请求
	// } else {
	// 	// 普通请求
	// }
	var fileName = req.params.fileName,
		data = req.body;

	// if (!data) {
	// 	var body = '',
	// 		jsonStr;
	// 	req.on('data', function(chunk) {
	// 		body += chunk; //读取参数流转化为字符串
	// 	});
	// 	req.on('end', function() {
	// 		try {
	// 			jsonStr = JSON.parse(body);
	// 		} catch (err) {
	// 			jsonStr = null;
	// 		}
	// 	})
	// 	data = jsonStr;
	// }

	var result = excel.writeExcel(__dirname + '/data/excel/' + fileName, data);
	res.send(result);
})
app.get('/writeJson', function(req, res) {
	json.writeJson(__dirname + '/data/json/excelData.json', data, function(err) {
		if (err) throw err;
		console.log('It\'s saved!');
		res.send('ok!');
	})
});

// run server
app.listen(5050);
console.log('localhost:5050!');
